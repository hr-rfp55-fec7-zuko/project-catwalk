import React from 'react';
<<<<<<< HEAD
import ReactDom from 'react-dom';

=======
>>>>>>> f62e4f86617285f4da6453fd4933e5484bd1d782
import { render, screen } from '@testing-library/react';

import App from '../client/src/app.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
<<<<<<< HEAD
    screen.debug();
=======
    // screen.debug();
>>>>>>> f62e4f86617285f4da6453fd4933e5484bd1d782
  });
});