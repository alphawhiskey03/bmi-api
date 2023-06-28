import { authOptions } from "@/lib/auth";
import { RevokeApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { withMethods } from "@/lib/api-middleware/with-methods";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RevokeApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (result) => result?.user
    );
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        success: false,
      });
    }

    const existingKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });
    if (!existingKey) {
      return res
        .status(500)
        .json({ error: "This API key could not be revoked", success: false });
    }
    await db.apiKey.update({
      where: {
        id: existingKey.id,
      },
      data: {
        enabled: false,
      },
    });

    return res.status(200).json({
      error: null,
      success: true,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(500).json({ error: err.issues, success: false });
    }
    return res.status(500).json({
      error: "Something wen't wrong",
      success: false,
    });
  }
};

export default withMethods(["POST"], handler);
