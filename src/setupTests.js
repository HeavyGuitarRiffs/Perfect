// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Adds the custom matchers
import MyComponent from './MyComponent';

test('renders the component with correct text', () => {
  render(<MyComponent />);
  const myElement = screen.getByText(/correct text/i);
  expect(myElement).toBeInTheDocument();
  expect(myElement).toHaveTextContent('Correct Text');
});