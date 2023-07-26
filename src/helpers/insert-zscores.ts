import { db } from "@/lib/db";
import { findUniqueRows } from "./utils";
import { FemaleZscoreData, MaleZscoreData } from "@/types/api";
// const male = require("../../data/male-zscores.json");
// const female = require("../../data/female-zscores.json");

export const insertMaleZScores = async (): Promise<MaleZscoreData[]> => {
  const male = {};
  const uniqueData = findUniqueRows(male);
  return Promise.all(
    uniqueData.map((m: any) => {
      const { _id, __v, ...rest } = m;
      return db.maleZscores.create({
        data: {
          ...rest,
        },
      });
    })
  );
};

export const insertFemaleZScores = async (): Promise<FemaleZscoreData[]> => {
  const female = {};
  const uniqueData = findUniqueRows(female);
  return Promise.all(
    uniqueData.map((m: any) => {
      // const { _id, __v, ...rest } = m;
      return db.femaleZscores.create({
        data: {
          ...m,
        },
      });
    })
  );
};
