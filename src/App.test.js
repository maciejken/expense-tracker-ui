import { render, screen } from '@testing-library/react';
import App from './App';

test('renders let\'s get started text', () => {
  render(<App />);
  const text = screen.getByText(/let's get started/i);
  expect(text).toBeInTheDocument();
});
