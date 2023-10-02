import { screen } from '@testing-library/react';
import GitHubUserErrorPage from '../Error/GitHubUserErrorPage';
import { renderWithRouter } from '../../test-utils';

const mockParams = jest.fn();
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');

  return {
    ...actual,
    useParams: () => mockParams(),
  }
});

describe('ErrorPage', () => {
  it('should render', () => {
    mockParams.mockReturnValue({ id: 'one' });

    renderWithRouter(<GitHubUserErrorPage/>);

    expect(screen.getByText('Oops! We had trouble trying to find one.')).toBeInTheDocument();
  });
});