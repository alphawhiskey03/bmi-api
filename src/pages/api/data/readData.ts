import {
  insertMaleZScores,
  insertFemaleZScores,
} from "@/helpers/insert-zscores";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const result = await insertMaleZScores();
    // return res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export default handler;
