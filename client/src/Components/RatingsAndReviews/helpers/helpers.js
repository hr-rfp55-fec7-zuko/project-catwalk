const helpers = {
  determineTotalReviews: function(reviewsObject) {
    if (Object.keys(reviewsObject).length === 0) {
      return 0;
    }

    let totalReviewCount = 0;

    for (var reviewProp in reviewsObject) {
      totalReviewCount += parseInt(reviewsObject[reviewProp]);
    }

    return totalReviewCount;
  },

  determineAverageRating: function(ratingsObject) {
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
  },

  truncateAverageRating: function(averageRating) {
    averageRating = parseFloat(averageRating);
    if (averageRating === 0) {
      return 0.0;
    }
    return averageRating.toFixed(1);
  },

  determinePercentageRecommend: function(recommendedObject) {
    if (Object.keys(recommendedObject).length === 0) {
      return 0;
    }

    let totalReviews = recommendedObject[true] + recommendedObject[false];
    return (Math.round((recommendedObject[true] / totalReviews) * 100));
  }

};

export default helpers;