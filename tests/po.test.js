import React from 'react';
import ReactDom from 'react-dom';

import { render, screen } from '@testing-library/react';

import App from '../client/src/app.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    screen.debug();
  });
});