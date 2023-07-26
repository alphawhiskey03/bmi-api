import { db } from "@/lib/db";

// >=2sd - obesity
// >=1sd - over weight
// 1sd to 2sdneg - normal
// <= sd2neg - thinnes
// <= sf3neg - severe thinness

export const getNutritionLevel = async (
  BMI: number,
  sex: string,
  age: number
) => {
  let data;
  if (sex === "male") {
    data = await db.maleZscores.findUnique({
      where: {
        month: age,
      },
    });
  } else {
    data = await db.femaleZscores.findUnique({
      where: {
        month: age,
      },
    });
  }

  if (!data) {
    throw new Error("No data found for the given age");
  }
  let nutritionLevel;
  if (BMI >= data.sd2) {
    nutritionLevel = "Obesity";
  } else if (BMI >= data.sd1 && BMI < data.sd2) {
    nutritionLevel = "Over Weight";
  } else if (BMI < data.sd1 && BMI > data.sd2neg) {
    nutritionLevel = "Normal";
  } else if (BMI <= data.sd2neg && BMI > data.sd3neg) {
    nutritionLevel = "thinnes";
  } else if (BMI <= data.sd3neg) {
    nutritionLevel = "severe thinnes";
  }
  return nutritionLevel;
};
