// const AverageRating = (obj) => {
//   let avgRating = 0;
//   let sum = 0;
//   let values = Object.values(obj);
//   for (let key of values) {
//     sum += parseInt(key);
//   }
//   avgRating = sum / values.length;
//   return avgRating;
// };

const averageRating = (obj) => {
  let wholeTotal = 0;
  let responseTotal = 0;
  if (obj) {
    const possibleRatings = Object.keys(obj);
    possibleRatings.forEach((rating) => {
      wholeTotal += (Number(obj[rating]) * Number(rating));
      responseTotal += Number(obj[rating]);
    });
    const result = wholeTotal / responseTotal;
    if (Number.isNaN((Math.round(result * 4) / 4).toFixed(1))) {
      return 0;
    }
    return result.toFixed(1);
  }
};

export default averageRating;



