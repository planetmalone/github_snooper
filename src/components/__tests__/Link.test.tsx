import { screen } from '@testing-library/react';
import Link from '../Link';
import { renderWithRouter } from '../../test-utils';

describe('Link', () => {
  it('should render with correct classes', () => {
    renderWithRouter(<Link to="" className="test-class" />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('test-class text-blue-500 hover:underline');
  });
});