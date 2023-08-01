import { withMethods } from "@/lib/api-middleware/with-methods";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  convertHightUStoMetric,
  convertWeightUStoMetric,
  convertCMtoMeter,
} from "@/helpers/utils";
import { getNutritionLevel } from "@/helpers/nutrition-level";

const vitalSchema = z.object({
  age: z
    .number()
    .min(3)
    .max(100)
    // .refine((value) => value <= 228)
    .transform((value) => (value > 19 ? 228 : value * 12)),
  height: z.string(),
  weight: z.number(),
  sex: z.enum(["male", "female"]),
  unitPreference: z.enum(["us", "metric"]),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.headers.authorization;
  if (!apiKey) {
    res.status(401).json({ message: "Unauthorized!" });
  }
  try {
    const {
      age: ageInMonths,
      height,
      weight,
      sex,
      unitPreference,
    } = vitalSchema.parse(req.body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey)
      return res.status(401).json({
        error: "Unauthorized",
      });

    const start = new Date();

    const heightInMeter: number =
      unitPreference === "us"
        ? convertHightUStoMetric(height)
        : convertCMtoMeter(height);

    const weightInKg: number =
      unitPreference === "us" ? convertWeightUStoMetric(weight) : weight;

    const BMI: number = parseFloat(
      (weightInKg / (heightInMeter * heightInMeter)).toFixed(2)
    );

    const nutritionLevel = await getNutritionLevel(BMI, sex, ageInMonths);

    const duration = new Date().getTime() - start.getTime();

    await db.apiRequest.create({
      data: {
        method: req.method as string,
        path: req.url as string,
        duration,
        apiKeyId: validApiKey.id,
        status: 200,
        usedApiKey: validApiKey.key,
      },
    });

    return res.json({
      success: true,
      ageInMonths,
      height,
      sex,
      nutritionLevel,
      BMI,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(500).json({
        error: err.issues,
        success: false,
      });
    }
    return res.status(500).json({
      error: "Something wen't wrong in the server",
      success: false,
    });
  }
};

export default withMethods(["POST"], handler);
