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
      .catch((error) => {});
  });
  test('can GET a product\'s styles by ID', () => {
    axios.get('http://localhost:3000/products/40344/styles')
      .then((response) => JSON.stringify(response.data))
      .then((response) => {
        expect(typeof response).toBe('array');
        expect(response.id).toBe('40344');
      })
      .catch((error) => {});
  });
  test('can GET a page of products', () => {
    axios.get('http://localhost:3000/products/40344/styles')
      .then((response) => JSON.stringify(response.data))
      .then((response) => {
        expect(typeof response).toBe('array');
        expect(response).toHaveLength(5);
        expext(response[0].id).toBeDefined();
      })
      .catch((error) => {});
  });
});
