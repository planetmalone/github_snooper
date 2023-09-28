import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

const mockUseNavigation: jest.Mock = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigation: () => mockUseNavigation(),
}));


describe('Spinner', () => {
  it('should render spinner when loading', () => {
    mockUseNavigation.mockReturnValue({ state: 'loading' });

    render(<Spinner/>);

    expect(screen.getByTestId('spinner')).toHaveClass('block');
  });

  it('should hide spinner when not loading', () => {
    mockUseNavigation.mockReturnValue({ state: 'stale' });

    render(<Spinner/>);

    expect(screen.getByTestId('spinner')).toHaveClass('hidden');
  });
});