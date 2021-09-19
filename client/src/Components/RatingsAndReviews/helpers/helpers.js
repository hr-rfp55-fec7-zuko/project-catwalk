


const helpers = {

  //Takes in RatingsAndReviews.state.metaData.ratings and adds the tally of each star rating to determine the total number of reviews
  determineTotalReviews: function(reviewsObject) {
    if (Object.keys(reviewsObject).length === 0) {
      return 0
    }

    let totalReviewCount = 0;

    for (var reviewProp in reviewsObject) {
      totalReviewCount += parseInt(reviewsObject[reviewProp]);
    }

    return totalReviewCount;
  },


  //Takes in metaData ratings object and returns average rating
  determineAverageRating: function(ratingsObject) {
    if (Object.keys(ratingsObject).length === 0) {
      return 0
    }

    let total = 0;
    let reviewCount = 0;

    for (var rating in ratingsObject) {
      total += (rating * ratingsObject[rating]);
      reviewCount += parseInt(ratingsObject[rating]);
    }

    return (total / reviewCount).toFixed(2);

  },

  //Takes in metaData recommended object and returns percent "true" of total recommendations
  determinePercentageRecommend: function(recommendedObject) {
    if (Object.keys(recommendedObject).length === 0) {
      return 0
    }

    let totalReviews = recommendedObject[true] + recommendedObject[false];

    return (Math.round((recommendedObject[true] / totalReviews) * 100));
  }

};

export default helpers;