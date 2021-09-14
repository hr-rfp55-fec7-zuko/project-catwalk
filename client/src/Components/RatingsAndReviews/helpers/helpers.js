


const helpers = {

  //Takes in RatingsAndReviews.state.metaData.ratings and adds the tally of each star rating to determine the total number of reviews
  determineTotalReviews: function(reviewsObject) {
    let totalReviewCount = 0;

    for (var reviewProp in reviewsObject) {
      totalReviewCount += parseInt(reviewsObject[reviewProp]);
    }

    return totalReviewCount;
  }

};

export default helpers;