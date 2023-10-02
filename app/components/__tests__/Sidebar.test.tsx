import { mockUsers, renderWithRouter } from '../../test-utils';
import Sidebar from '../Sidebar';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

const mockFetchResults = jest.fn();
jest.mock('../../common/hooks/useSearchForUsers', () => ({
  useSearchForUsers: () => [
    mockUsers,
    mockFetchResults,
  ],
}));

describe('Sidebar', () => {
  it('should handle selection', () => {
    const mockHandleSelection = jest.fn();
    renderWithRouter(
      <Sidebar onUserSelection={mockHandleSelection}/>,
      [
        {
          path: 'users/one',
          element: <Sidebar onUserSelection={mockHandleSelection}/>,
        }
      ]
    );

    userEvent.click(screen.getAllByRole('button')[0]);

    expect(mockHandleSelection).toHaveBeenCalled();
  });

  it('should handle search updates', () => {
    const mockHandleSelection = jest.fn();

    renderWithRouter(
      <Sidebar onUserSelection={mockHandleSelection}/>,
      [
        {
          path: 'users/one',
          element: <Sidebar onUserSelection={mockHandleSelection}/>,
        }
      ]
    );

    expect(screen.getByRole('textbox')).toHaveValue('');

    mockFetchResults.mockReset();
    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(mockFetchResults).toHaveBeenCalledWith('test');
    expect(window.location.search).toEqual('?q=test');

    mockFetchResults.mockReset();
    window.location.search = '?q=test';
    userEvent.type(screen.getByRole('textbox'), '2');
    expect(mockFetchResults).toHaveBeenCalledWith('test2');
    expect(window.location.search).toEqual('?q=test2');

    mockFetchResults.mockReset();
    window.location.search = '?q=test2';
    userEvent.type(screen.getByRole('textbox'), '3');
    expect(mockFetchResults).toHaveBeenCalledWith('test23');
    expect(window.location.search).toEqual('?q=test23');
  });
});
