import { useEffect, useState } from 'react';
import { useSearchForUsers } from '../useSearchForUsers';
import { act, render, screen, waitFor } from '@testing-library/react';
import { mockUsers } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

jest.useFakeTimers();
const mockGetGitHubUsers = jest.fn();
jest.mock('../../api', () => ({
  getGitHubUsers: () => mockGetGitHubUsers(),
}));

const TestComponent = () => {
  const [users, fetchResults] = useSearchForUsers();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchResults(search, search.length);
  }, [search, fetchResults]);

  return (
    <>
      <input type="text" value={search} onChange={event => setSearch(event.target.value)}/>
      {users.map(user => (
        <div data-testid="user" key={user.id}>{user.name}</div>
      ))}
    </>
  );
};

describe('TestComponent', () => {
  it('should fetch users from the api', async () => {
    mockGetGitHubUsers.mockReturnValue(mockUsers);

    render(<TestComponent/>);

    userEvent.type(await screen.findByRole('textbox'), 'test');
    jest.runAllTimers();

    await waitFor(() => {
      expect(mockGetGitHubUsers).toHaveBeenCalledTimes(1);
    });
  });

  it('should fetch users from cache if available', async () => {
    mockGetGitHubUsers.mockReturnValue(mockUsers);

    render(<TestComponent/>);

    userEvent.type(await screen.findByRole('textbox'), 'test');
    jest.runAllTimers();
    userEvent.type(await screen.findByRole('textbox'), '{backspace}');
    jest.runAllTimers();
    userEvent.type(await screen.findByRole('textbox'), 'test');
    jest.runAllTimers();

    await waitFor(() => {
      expect(mockGetGitHubUsers).toHaveBeenCalledTimes(2);
    });
  });
});