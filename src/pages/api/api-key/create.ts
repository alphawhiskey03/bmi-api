import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { nanoid } from "nanoid";
import { withMethods } from "@/lib/api-middleware/with-methods";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (result) => result?.user
    );
    if (!user) {
      return res.status(401).json({
        error: "You are not authorized to access this route",
        createdApiKey: null,
      });
    }
    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });
    if (existingApiKey) {
      return res.status(400).json({
        error: "You already have an active API key",
        createdApiKey: null,
      });
    }
    const apiKey = await db.apiKey.create({
      data: {
        key: nanoid(),
        enabled: true,
        userId: user.id,
      },
    });
    return res.status(200).json({
      error: null,
      createdApiKey: apiKey,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: err.issues,
        createdApiKey: null,
      });
    }
    return res.status(400).json({
      error: "Something wen't wrong.",
      createdApiKey: null,
    });
  }
};

export default withMethods(["GET"], handler);
