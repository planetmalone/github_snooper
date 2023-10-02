import { screen, waitFor } from '@testing-library/react';
import Main from '../Main';
import { mockUsers, renderWithRouter } from '../../test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('../../common/hooks/useSearchForUsers', () => ({
  useSearchForUsers: () => [
    mockUsers,
    () => {},
  ],
}));

describe('Main', () => {
  it('should hide sidebar by default', () => {
    renderWithRouter(<Main/>);

    expect(screen.getByRole('complementary')).not.toHaveClass('translate-x-0');
  });

  it('should open sidebar when trigger is clicked', async () => {
    renderWithRouter(<Main/>);

    userEvent.click(screen.getAllByRole('button')[0]);

    await waitFor(() => {
      expect(screen.getByRole('complementary')).toHaveClass('translate-x-0');
    });
  });

  it('should close sidebar when tapping on my view', async () => {
    renderWithRouter(<Main/>);

    userEvent.click(screen.getAllByRole('button')[0]);
    userEvent.click(screen.getByRole('main'));

    await waitFor(() => {
      expect(screen.getByRole('complementary')).not.toHaveClass('translate-x-0');
    });
  });

  it('should close sidebar when tapping on user selection', async () => {
    renderWithRouter(<Main/>, [
      {
        path: '/users/one',
        element: <Main/>,
      }
    ]);

    userEvent.click(screen.getAllByRole('button')[0]);
    userEvent.click(screen.getAllByRole('button')[1]);

    await waitFor(() => {
      expect(screen.getByRole('complementary')).not.toHaveClass('translate-x-0');
    });
  });
});