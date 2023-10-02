import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  it('should set default search value', () => {
    const mockValue = 'test';
    const mockOnUpdate = () => {};

    render(<SearchBar value={mockValue} onUpdate={mockOnUpdate} />);

    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('should update caller on change', () => {
    const mockValue = 'test';
    const mockOnUpdate = jest.fn();

    render(<SearchBar value={mockValue} onUpdate={mockOnUpdate} />);

    userEvent.type(screen.getByRole('textbox'), '2');

    expect(mockOnUpdate).toHaveBeenCalledWith('test2');
  });
})