import React from 'react';
// import { render, screen } from '@testing-library/react';
import $ from 'jquery';

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