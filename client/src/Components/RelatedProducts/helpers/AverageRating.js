const AverageRating = (obj) => {
  let avgRating = 0;
  let sum = 0;
  let values = Object.values(obj);
  for (let key of values) {
    sum += parseInt(key);
  }
  avgRating = sum / values.length;
  return avgRating;
};

export default AverageRating;

