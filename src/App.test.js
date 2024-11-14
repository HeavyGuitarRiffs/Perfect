import { render, screen } from '@testing-library/react';
import App from './App';

// Test for rendering main title
test('renders main title', () => {
  render(<App />);
  const titleElement = screen.getByText(/my app/i);
  expect(titleElement).toBeInTheDocument();
});

// Test for the "Connect to MetaMask" button
test('renders connect to MetaMask button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/connect to metamask/i);
  expect(buttonElement).toBeInTheDocument();
});

// Snapshot testing example
test('matches snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
