import { screen } from '@testing-library/react';
import SummaryCard from '../SummaryCard';
import { mockUsers, renderWithRouter } from '../../test-utils';
import userEvent from '@testing-library/user-event';

const mockUseLocation = jest.fn();
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');

  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  }
});

describe('SummaryCard', () => {
  it('should render', () => {
    mockUseLocation.mockReturnValue({ search: '' });
    const component = <SummaryCard user={mockUsers[0]}/>;

    renderWithRouter(
      component,
      [
        {
          path: '/users/one',
          element: component,
        }
      ]
    );
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('summary-card')).toBeInTheDocument();
  });

  it('should notify when card is clicked', () => {
    mockUseLocation.mockReturnValue({ search: '' });
    const mockHandleOpen = jest.fn();
    const component = <SummaryCard user={mockUsers[0]} onOpen={mockHandleOpen}/>;

    renderWithRouter(
     component,
      [
        {
          path: '/users/one',
          element: component,
        }
      ]
    );

    userEvent.click(screen.getByRole('button'));

    expect(mockHandleOpen).toHaveBeenCalled();
  });
});