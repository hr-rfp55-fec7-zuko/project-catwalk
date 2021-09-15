import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom';
import $ from 'jquery';
import axios from 'axios';

test('Server Testing: Get relatived Products', () => {
  axios.get('http://localhost:3000/products/40344/related')
    .then((response) => JSON.stringify(response.data))
    .then((response) => {
      expect(typeof response).toBe('array');
      expect(response).toHaveLength(4);
    });
});

test('Server Testing: Get information of a relative product', () => {
  axios.get('http://localhost:3000/products/40345')
    .then((response) => JSON.stringify(response.data))
    .then((response) => {
      expect(typeof response).toBe('object');
      expect(response.name).toBe('Bright Future Sunglasses');
    });
});
