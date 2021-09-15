import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../client/src/app.jsx';
import $ from 'jquery';

test ('Client Testing: Render Questions and Answers section', () => {
  render(<App />);
  expect(screen.getByText('QUESTIONS & ANSWERS')).toBeTruthy();
});

test ('Server Testing: GET Questions List Method Works', () => {
  $.ajax({
    type: 'GET',
    url: '/qa/questions',
    error: (err) => {
      expect(err).toBe(null);
    },
    success: (data) => {
      expect(data.length).toBeGreaterThanOrEqual(0);
    }
  });
});

test ('Server Testing: Respond To Client With An Array Sorted By Questions Helpfulness In Descending Order', () => {
  $.ajax({
    type: 'GET',
    url: '/qa/questions',
    error: (err) => {
      expect(err).toBe(null);
    },
    success: (data) => {
      for (var i = 0; i < data.length - 1; i++) {
        expect(data[i].question_helpfulness).toBeGreaterThanOrEqual(data[i + 1].question_helpfulness);
      }
    }
  });
});