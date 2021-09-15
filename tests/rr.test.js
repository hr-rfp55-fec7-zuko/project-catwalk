import React from 'react';
import {render, screen} from '@testing-library/react';
import RatingsAndReviews from '../client/src/Components/RatingsAndReviews/RatingsAndReviews.jsx';

describe('RatingsAndReviews', () => {
  test('Should Render Widget Component', () => {
    render(<RatingsAndReviews />);
  });

  test('Should Include Text "Ratings And Reviews"', () => {
    render(<RatingsAndReviews />);
    expect(screen.getAllByText('Ratings and Reviews')).toBeTruthy();
  });

  test('Should Render ProductBreakdown Module', () => {
    render(<RatingsAndReviews />);
    expect(screen.getAllByText('')).toBeTruthy();
  });
});


/*#####ARCHITECTURE#####*/
//RatingsAndReviews Component should exist

//RR - should have a ProductBreakdown component

//RR - should have a RatingBreakdown component

//RR - should have a SortBar component

//RR - should have a ReviewList component


/*#####ReviewList#####*/
//On render, ReviewList should have 2x review tiles as children

//The number of childElements in ReviewList should match RR.state ProductReviews

//There should be a button with id "more-reviews"

//There should be a button with id "add-review"


