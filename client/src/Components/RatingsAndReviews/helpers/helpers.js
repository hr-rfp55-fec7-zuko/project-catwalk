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

const filterReviewEntries = (filterValue, currentStarFiltersState) => {


  const indexOfFilterValue = currentStarFiltersState.indexOf(filterValue);
  let newFilterList, clearFilterVisibility;

  if (currentStarFiltersState.length === 0) {
    newFilterList = [filterValue];
    clearFilterVisibility = true;
  } else if (indexOfFilterValue === 0 && currentStarFiltersState.length === 1) {
    newFilterList = [];
    clearFilterVisibility = false;
  } else if (indexOfFilterValue === 0) {
    newFilterList = currentStarFiltersState.slice(1);
  } else if (indexOfFilterValue !== -1) {
    newFilterList = currentStarFiltersState.slice();
    newFilterList.splice((indexOfFilterValue), 1);
    clearFilterVisibility = true;
  } else if (indexOfFilterValue === -1) {
    newFilterList = currentStarFiltersState.slice();
    newFilterList.push(filterValue);
    clearFilterVisibility = true;
  } else {
    newFilterList = currentStarFiltersState.slice();
    newFilterList.push(filterValue);
    clearFilterVisibility = true;
  }

  if (newFilterList.length === 0) {
    clearFilterVisibility = false;
  }

  const updatedStarFiltersState = {starFilters: newFilterList, clearFilterVisible: clearFilterVisibility};

  return updatedStarFiltersState;

};

module.exports = {
  determineTotalReviews,
  determineAverageRating,
  filterReviewEntries,
};