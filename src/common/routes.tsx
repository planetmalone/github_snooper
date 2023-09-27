import { createBrowserRouter, redirect } from 'react-router-dom';
import ErrorPage from '../pages/Error/ErrorPage';
import WelcomePage, { loader as welcomeLoader } from '../pages/WelcomePage';
import GitHubUserPage, { loader as userLoader } from '../pages/GitHubUserPage';
import Main from '../components/Main';
import GitHubUserErrorPage from '../pages/Error/GitHubUserErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        loader: welcomeLoader,
        element: <WelcomePage/>,
      },
      {
        path: 'users/:id',
        loader: userLoader,
        element: <GitHubUserPage/>,
        errorElement: <GitHubUserErrorPage/>,
      },
      {
        path: '*',
        loader: () => redirect('/')
      }
    ]
  },
]);