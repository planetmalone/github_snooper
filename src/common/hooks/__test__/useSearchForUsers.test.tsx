import { useEffect, useState } from 'react';
import { useSearchForUsers } from '../useSearchForUsers';
import { render, screen } from '@testing-library/react';
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
  it('should fetch users from the api', () => {
    mockGetGitHubUsers.mockReturnValue(mockUsers);

    render(<TestComponent/>);

    userEvent.type(screen.getByRole('textbox'), 'test');
    jest.runAllTimers();

    expect(mockGetGitHubUsers).toHaveBeenCalledTimes(1);
  });

  it('should fetch users from cache if available', () => {
    mockGetGitHubUsers.mockReturnValue(mockUsers);

    render(<TestComponent/>);

    userEvent.type(screen.getByRole('textbox'), 'test');
    jest.runAllTimers();
    userEvent.type(screen.getByRole('textbox'), '{backspace}');
    jest.runAllTimers();
    userEvent.type(screen.getByRole('textbox'), 'test');

    expect(mockGetGitHubUsers).toHaveBeenCalledTimes(2);
  });
});