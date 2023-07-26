const POUND_IN_KG = 0.45359237;
const FEET_IN_METER = 0.3048;
const INCH_IN_METER = 0.0254;

// TDEE
type ACTIVITY_CONSTANTS_TYPE = {
  [key: string]: number;
};

const ACTIVITY_CONSTANTS: ACTIVITY_CONSTANTS_TYPE = {
  sedantary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.7325,
  extraActive: 1.9,
};

export const findUniqueRows = (arr: any, track = new Set()) => {
  return arr.filter(({ month, year }: { month: String; year: String }) => {
    if (track.has(month) || track.has(year)) {
      return false;
    } else {
      return track.add(month) && track.add(year);
    }
  });
};

export const convertHightUStoMetric = (height: string): number => {
  const match = height.match(/^(\d+)'?(\d+)?$/);
  if (!match) {
    throw new Error("Invalid format of height in feet");
  }
  const feet = parseInt(match[1]);
  const inches = match[2] ? parseInt(match[2]) : 0;
  return feet * FEET_IN_METER + inches * INCH_IN_METER;
};

export const convertWeightUStoMetric = (weight: number): number => {
  return weight * POUND_IN_KG;
};
export const convertCMtoMeter = (height: string): number => {
  return parseInt(height) / 100;
};

export const calculateTDEE = (activityFactor: string, bmr: number): number => {
  return bmr * ACTIVITY_CONSTANTS[activityFactor];
};
