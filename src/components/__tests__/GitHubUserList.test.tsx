import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import GitHubUserList from '../GitHubUserList';
import { mockUsers } from '../../test-utils';

describe('GitHubUserList', () => {
  it('should render', () => {
    const handleSelection = jest.fn();

    render(
      <GitHubUserList users={mockUsers} onSelection={handleSelection}/>,
      {
        wrapper: BrowserRouter
      }
    );
    screen.getAllByRole('link').forEach(link => userEvent.click(link));

    expect(screen.getAllByRole('listitem').length).toEqual(2);
    expect(handleSelection).toHaveBeenCalledTimes(2);
    expect(screen.getAllByTestId('summary-card').at(0)).toHaveClass('border-zinc-500');
  });
});