import React from 'react';
import {render, screen} from '@testing-library/react';
import RatingsAndReviews from '../RatingsAndReviews.jsx';

describe('RatingsAndReviews', () => {
  test('Renders Widget Component', () => {
    render(<RatingsAndReviews />);
  });

  test('Should have a header called Ratings And Reviews', () => {
    render(<RatingsAndReviews />);
    expect(screen.getByText('Ratings and Reviews')).toBeInTheDocument();
  });

  test('Should have a header called Ratings And Reviews', () => {
    render(<RatingsAndReviews />);
    expect(screen.getByText(/Ratings and Reviews/)).toBeInTheDocument();
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


