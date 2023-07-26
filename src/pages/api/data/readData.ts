import {
  insertMaleZScores,
  insertFemaleZScores,
} from "@/helpers/insert-zscores";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await insertMaleZScores();
    return res.status(200).json({
      success: true,
      error: null,
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something wen't wrong in the server!" });
  }
};

export default handler;
