import { screen } from '@testing-library/react';
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

  it('should open sidebar when trigger is clicked', () => {
    renderWithRouter(<Main/>);

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('complementary')).toHaveClass('translate-x-0');
  });

  it('should close sidebar when tapping on my view', () => {
    renderWithRouter(<Main/>);

    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByRole('main'));

    expect(screen.getByRole('complementary')).not.toHaveClass('translate-x-0');
  });

  it('should close sidebar when tapping on user selection', () => {
    renderWithRouter(<Main/>, [
      {
        path: '/users/one',
        element: <Main/>,
      }
    ]);

    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getAllByRole('link')[0]);

    expect(screen.getByRole('complementary')).not.toHaveClass('translate-x-0');
  });
});