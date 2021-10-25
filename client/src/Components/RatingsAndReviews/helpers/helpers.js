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
    var recommendationArray = Object.values(recommendedObject).map((val) => parseInt(val));
    var totalRecommendations = recommendationArray.reduce((total, val) => total += parseInt(val));

    if (recommendedObject[true] === undefined || totalRecommendations === 0) {
      return 0;
    }

    return (Math.round((recommendedObject[true] / totalRecommendations) * 100));
  },

  buildReviewObject(formDataObj, productId, photos) {

    var productId = parseInt(productId);
    var rating = parseInt(formDataObj.rating);
    var recommended = formDataObj.recommended === 'No' ? false : true;

    var characteristics = {};
    for (var characteristic in formDataObj.characteristics) {
      console.log(formDataObj.characteristics[characteristic]);
      parseInt(formDataObj.characteristics[characteristic]);
      characteristics[characteristic] = parseInt(formDataObj.characteristics[characteristic]);
    }

    return {
      'product_id': productId,
      'rating': rating,
      'summary': formDataObj.summary,
      'body': formDataObj.body,
      'recommend': recommended,
      'name': formDataObj.name,
      'email': formDataObj.email,
      'photos': photos,
      'characteristics': characteristics
    };
  },

  findFormIncompletes(formData) {
    var mandatoryFormFields = ['name', 'email', 'rating', 'recommended', 'summary', 'body'];

    var incompleteFields = [];

    for (var property in formData) {
      if (Boolean(formData[property]) !== true) {
        incompleteFields.push(property);
      }
    }

    var incompleteFieldReminder =
      incompleteFields.some((field => mandatoryFormFields.includes(field))) ? 'Please complete all mandatory form fields.\n' : '';

    var emailReminder =
      !formData.email.includes('@') ? 'Please enter valid email address.\n' : '';

    var bodyLengthReminder =
      !(formData.body.length >= 50) ? 'Reiew body must be at least 50 characters' : '';

    return incompleteFieldReminder + emailReminder + bodyLengthReminder;
  }

};

export default helpers;