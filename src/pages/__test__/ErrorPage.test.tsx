import { render, screen } from '@testing-library/react';
import ErrorPage from '../Error/ErrorPage';

describe('ErrorPage', () => {
  it('should render', () => {
    render(<ErrorPage/>);

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
  });
});