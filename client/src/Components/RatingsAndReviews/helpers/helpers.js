


const helpers = {

  //Takes in RatingsAndReviews.state.metaData.ratings and adds the tally of each star rating to determine the total number of reviews
  determineTotalReviews: function(reviewsObject) {
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

    return (total / reviewCount).toFixed(2);

  },

  determinePercentageRecommend: function(recommendedObject) {
    let totalReviews = recommendedObject[true] + recommendedObject[false];

    return (Math.round((recommendedObject[true] / totalReviews) * 100));
  }

};

export default helpers;