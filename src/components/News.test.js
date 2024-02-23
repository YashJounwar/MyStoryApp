// import { TextEncoder, TextDecoder } from 'util'
// global.TextEncoder = TextEncoder
// // @ts-expect-error
// global.TextDecoder = TextDecoder
// import {jest} from '@jest/globals';
// jest.useFakeTimers();
import React from 'react';
import { render,} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for expect(...).toBeInTheDocument()
import News from './News';

test('renders with default option "Technology"', async () => {
  const { getByLabelText } = render(<News />);

  // Select elements
  const countrySelect = getByLabelText('Country:');
  const categorySelect = getByLabelText('Category:');

  // Check default selected options
  expect(countrySelect).toHaveValue('us'); // Assuming 'us' is the default country
  expect(categorySelect).toHaveValue('technology'); // Assuming 'technology' is the default category
});

// Write additional tests as needed
