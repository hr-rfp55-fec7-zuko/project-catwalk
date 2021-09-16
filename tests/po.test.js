import React from 'react';

import { render, screen } from '@testing-library/react';
import App from '../client/src/app.jsx';
import axios from 'axios';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    // screen.debug();
  });
});

describe('Product Server Routes', () => {
  test('can GET a product by ID', () => {
    axios.get('http://localhost:3000/products/40344')
      .then((response) => JSON.stringify(response.data))
      .then((response) => {
        expect(typeof response).toBe('object');
        expect(response.id).toBe('40344');
      })
      .catch((error) => { });
  });
  test('can GET a product\'s styles by ID', () => {
    axios.get('http://localhost:3000/products/40344/styles')
      .then((response) => JSON.stringify(response.data))
      .then((response) => {
        expect(typeof response).toBe('array');
        expect(response.id).toBe('40344');
      })
      .catch((error) => { });
  });
  test('can GET a page of products', () => {
    axios.get('http://localhost:3000/products/40344/styles')
      .then((response) => JSON.stringify(response.data))
      .then((response) => {
        expect(typeof response).toBe('array');
        expect(response).toHaveLength(5);
        expext(response[0].id).toBeDefined();
      })
      .catch((error) => { });
  });
});

describe('Cart Server Routes', () => {
  test('can GET the cart', () => {
    axios.get('http://localhost:3000/cart/')
      .then((response) => JSON.stringify(response.data))
      .then((response) => {
        expect(Array.isArray(response)).toBe(true);
      })
      .catch((error) => { });
  });
  test('can POST to the cart', () => {
    axios.post('http://localhost:3000/cart/', {'sku_id': 1394770})
      .then(() => axios.get('http://localhost:3000/cart/'))
      .then((response) => {
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data[0][sku_id]).toBe('1394770');
        expect(response.data[0][count]).toBeGreaterThan(0);
      })
      .catch((error) => { });
  });
});
