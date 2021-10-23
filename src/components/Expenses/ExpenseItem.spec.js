import { render, screen } from '@testing-library/react';
import ExpenseItem from './ExpenseItem';

describe('ExpenseItem', () => {
  it('renders Expense item! text', () => {
    render(<ExpenseItem></ExpenseItem>);
    const text = screen.getByText('Expense item!');
    expect(text).toBeInTheDocument();
  });
});
