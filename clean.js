// const fs = require("fs");

// const male = require("./data/male-zscores.json");
// const female = require("./data/female-zscores.json");

// const cleanData = (data) =>
//   data.map(
//     ({
//       year,
//       month,
//       sd4neg,
//       sd3neg,
//       sd2neg,
//       sd1neg,
//       sd0,
//       sd1,
//       sd2,
//       sd3,
//       sd4,
//     }) => {
//       return {
//         year: year,
//         month: Number(month),
//         sd4neg: Number(sd4neg),
//         sd3neg: Number(sd3neg),
//         sd2neg: Number(sd2neg),
//         sd1neg: Number(sd1neg),
//         sd0: Number(sd0),
//         sd1: Number(sd1),
//         sd2: Number(sd2),
//         sd3: Number(sd3),
//         sd4: Number(sd4),
//       };
//     }
//   );

// const cleanMaleData = cleanData(male);
// const cleanFemaleData = cleanData(female);

// fs.writeFile(
//   "./data/male-zscores.json",
//   JSON.stringify(cleanMaleData),
//   (err) => {
//     console.log(err);
//   }
// );

// fs.writeFile(
//   "./data/female-zscores.json",
//   JSON.stringify(cleanFemaleData),
//   (err) => {
//     console.log(err);
//   }
// );
