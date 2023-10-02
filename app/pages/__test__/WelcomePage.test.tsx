import { mockUsers, renderWithRouter } from '../../test-utils';
import { screen } from '@testing-library/react';
import WelcomePage from '../../../routes/WelcomePage';

const mockUseLoaderData = jest.fn();
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');

  return {
    ...actual,
    useLoaderData: () => mockUseLoaderData(),
  };
});

describe('WelcomePage', () => {
  it('should render', () => {
    mockUseLoaderData.mockReturnValue(mockUsers);

    renderWithRouter(<WelcomePage/>);

    expect(screen.getByText('Welcome to GitHub Snooper')).toBeInTheDocument();
    expect(screen.getAllByTestId('summary-card')).toHaveLength(2);
  });
});