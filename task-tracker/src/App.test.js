import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('cannot add empty task', () => {
  // Simulate user trying to add empty task and expect error message
});

// ...add more tests for edit, delete, search, rules...
