export const findUniqueRows = (arr: any, track = new Set()) => {
  return arr.filter(({ month, year }: { month: String; year: String }) => {
    if (track.has(month) || track.has(year)) {
      return false;
    } else {
      return track.add(month) && track.add(year);
    }
  });
};
