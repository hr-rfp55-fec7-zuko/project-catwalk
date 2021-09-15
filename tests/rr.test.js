import React from 'react';
import {render, screen} from '@testing-library/react';

// import exampleMetaData from '../client/src/Components/RatingsAndReviews/exampleData/exampleMetaData.js';

// import exampleReviews from '../client/src/Components/RatingsAndReviews/exampleData/exampleReviews.js';

// import helpers from '../client/src/Components/RatingsAndReviews/helpers/helpers.js';


import RatingsAndReviews from '../client/src/Components/RatingsAndReviews/RatingsAndReviews.jsx';

describe('RatingsAndReviews', () => {
  test('Should Render Widget Component', () => {
    render(<RatingsAndReviews />);
  });

  test('Should Include Text "Ratings And Reviews"', () => {
    render(<RatingsAndReviews />);
    expect(screen.getAllByText('Ratings and Reviews')).toBeTruthy();
  });

});

import ProductBreakdown from '../client/src/Components/RatingsAndReviews/ProductBreakdown.jsx';

describe('Product Breakdown', () => {
  test('Should Render Module', () => {
    render(<ProductBreakdown />);
  });

  test('Should Include Text "Product Breakdown"', () => {
    render(<ProductBreakdown />);
    expect(screen.getAllByText('Product Breakdown')).toBeTruthy();
  });

});

// import RatingBreakdown from '../client/src/Components/RatingsAndReviews/RatingBreakdown.jsx';

// describe('RatingBreakdown', () => {
//   test('Should Render Module', () => {
//     render(<RatingBreakdown />);
//   });
// });

import AddReviewForm from '../client/src/Components/RatingsAndReviews/AddReviewForm.jsx';

describe('AddReviewForm', () => {
  test('Should Render Module', () => {
    render(<AddReviewForm />);
  });
});

import ReviewTile from '../client/src/Components/RatingsAndReviews/AddReviewForm.jsx';

describe('ReviewTile', () => {
  test('Should Render Module', () => {
    render(<ReviewTile />);
  });
});


// import ReviewList from '../client/src/Components/RatingsAndReviews/ReviewList.jsx';


import SortBar from '../client/src/Components/RatingsAndReviews/SortBar.jsx';

describe('SortBar', () => {
  test('Should Render Module', () => {
    render(<SortBar />);
  });
});
