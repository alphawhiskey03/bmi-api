import {
  calculateTDEE,
  convertHightUStoMetric,
  convertWeightUStoMetric,
} from "@/helpers/utils";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const vitalSchema = z.object({
  age: z.number().min(3).max(100),
  height: z.string(),
  weight: z.number(),
  sex: z.enum(["male", "female"]),
  unitPreference: z.enum(["us", "metric"]),
  activityFactor: z.enum([
    "sedantary",
    "lightlyActive",
    "moderatelyActive",
    "veryActive",
    "extraActive",
  ]),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res.status(401).json({
      error: "Unauthorized",
      success: false,
    });
  }

  try {
    const { age, height, weight, sex, unitPreference, activityFactor } =
      vitalSchema.parse(req.body);

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

    const heightInCM: number =
      unitPreference == "us"
        ? convertHightUStoMetric(height) * 100
        : Number(height);

    const weightInKg: number =
      unitPreference == "us" ? convertWeightUStoMetric(weight) : weight;

    const BMR = 10 * weightInKg + 6.25 * heightInCM - 5 * age + 5;
    const TDEE = calculateTDEE(activityFactor, BMR);

    const duration = new Date().getTime() - start.getTime();

    await db.apiRequest.create({
      data: {
        method: req.method as string,
        path: req.url as string,
        duration,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return res.status(200).json({
      success: true,
      BMR,
      TDEE,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Something wen't wrong!",
    });
  }
};

export default handler;
