import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';
import Welcome from '../pages/Welcome/Welcome';
import GitHubUser, { loader as userLoader } from '../pages/GitHubUser/GitHubUser';
import Main from '../components/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Welcome/>,
      },
      {
        path: 'users/:id',
        loader: userLoader,
        element: <GitHubUser/>
      },
    ]
  },
]);