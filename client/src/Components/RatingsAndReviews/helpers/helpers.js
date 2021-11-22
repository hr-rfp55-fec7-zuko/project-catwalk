const determineTotalReviews = (reviewsObject) => {
  if (Object.keys(reviewsObject).length === 0) {
    return 0;
  }

  let totalReviewCount = 0;

  for (var reviewProp in reviewsObject) {
    totalReviewCount += parseInt(reviewsObject[reviewProp]);
  }

  return totalReviewCount;
};

const determineAverageRating = (ratingsObject) => {
  let total = 0;
  let reviewCount = 0;

  for (var rating in ratingsObject) {
    total += (rating * ratingsObject[rating]);
    reviewCount += parseInt(ratingsObject[rating]);
  }

  if (reviewCount === 0) {
    return 0;
  }

  return (total / reviewCount).toFixed(2);
};

module.exports = {
  determineTotalReviews,
  determineAverageRating,
};