import { createMemoryRouter, RouterProvider } from '@remix-run/react';
import { GitHubUser } from './common/types/GitHub';
import { render } from '@testing-library/react';
import { GraphQlQueryResponseData } from '@octokit/graphql';

export const renderWithRouter = (children: JSX.Element | JSX.Element[], routes: {
  path: string,
  element: JSX.Element
}[] = []) => {
  const options = { element: children, path: '/' };

  const router = createMemoryRouter(
    [options, ...routes],
    {
      initialEntries: [options.path],
      initialIndex: 1
    }
  );

  return render(<RouterProvider router={router}/>);
};

// mock Window
window.scrollTo = () => {};

export const mockUsers: GitHubUser[] = [
  {
    id: '1',
    login: 'one',
    name: 'John User',
    avatarUrl: 'https://avatar.github.com/one',
    followerCount: 1,
    followers: [
      {
        id: '2',
        login: 'two',
        avatarUrl: 'https://avatar.github.com/two',
        name: 'Jane User',
        url: 'https://github.com/two',
      }
    ],
    organizations: [
      {
        id: '123',
        avatarUrl: 'https://avatars.github.com/123',
        login: 'orgOne',
        name: 'Org One',
        url: 'https://github.com/orgOne',
      }
    ],
    repositories: [
      {
        id: 'r1',
        description: 'John\' First repo',
        forkCount: 0,
        name: 'john-one',
        primaryLanguage: {
          color: 'blue',
          name: 'JavaScript',
        },
        stargazerCount: 164,
        url: 'https://github.com/one/john-one',
      },
      {
        id: 'r2',
        description: 'John\' Second repo',
        forkCount: 0,
        name: 'john-two',
        primaryLanguage: {
          color: 'red',
          name: 'Java',
        },
        stargazerCount: 74534,
        url: 'https://github.com/one/john-two',
      }
    ],
    url: 'https://github.com/one',
  },
  {
    id: '2',
    login: 'two',
    name: 'Jane User',
    avatarUrl: 'https://avatar.github.com/two',
    followerCount: 1,
    followers: [
      {
        id: '1',
        login: 'one',
        avatarUrl: 'https://avatar.github.com/one',
        name: 'John User',
        url: 'https://github.com/one',
      }
    ],
    organizations: [
      {
        id: '124',
        avatarUrl: 'https://avatars.github.com/124',
        login: 'orgTwo',
        name: 'Org Two',
        url: 'https://github.com/orgTwo',
      }
    ],
    repositories: [],
    url: 'https://github.com/two',
  }
];

export const mockUsersResponse: GraphQlQueryResponseData[] = [
  {
    id: '1',
    login: 'one',
    name: 'John User',
    avatarUrl: 'https://avatar.github.com/one',
    followers: {
      totalCount: 1,
      nodes: [
        {
          id: '2',
          login: 'two',
          avatarUrl: 'https://avatar.github.com/two',
          name: 'Jane User',
          url: 'https://github.com/two',
        }
      ]
    },
    organizations: {
      nodes: [
        {
          id: '123',
          avatarUrl: 'https://avatars.github.com/123',
          login: 'orgOne',
          name: 'Org One',
          url: 'https://github.com/orgOne',
        }
      ]
    },
    repositories: {
      nodes: [
        {
          id: 'r1',
          description: 'John\' First repo',
          forkCount: 0,
          name: 'john-one',
          primaryLanguage: {
            color: 'blue',
            name: 'JavaScript',
          },
          stargazerCount: 164,
          url: 'https://github.com/one/john-one',
        },
        {
          id: 'r2',
          description: 'John\' Second repo',
          forkCount: 0,
          name: 'john-two',
          primaryLanguage: {
            color: 'red',
            name: 'Java',
          },
          stargazerCount: 74534,
          url: 'https://github.com/one/john-two',
        }
      ]
    },
    url: 'https://github.com/one',
  },
  {
    id: '2',
    login: 'two',
    name: 'Jane User',
    avatarUrl: 'https://avatar.github.com/two',
    followers: {
      totalCount: 1,
      nodes: [
        {
          id: '1',
          login: 'one',
          avatarUrl: 'https://avatar.github.com/one',
          name: 'John User',
          url: 'https://github.com/one',
        }
      ]
    },
    organizations: {
      nodes: [
        {
          id: '124',
          avatarUrl: 'https://avatars.github.com/124',
          login: 'orgTwo',
          name: 'Org Two',
          url: 'https://github.com/orgTwo',
        }
      ]
    },
    repositories: [],
    url: 'https://github.com/two',
  }
];

export const mockUserSummaries = [
  {
    avatarUrl: 'https://avatar.github.com/one',
    id: '1',
    login: 'one',
    name: 'John User',
    url: 'https://github.com/one'
  },
  {
    avatarUrl: 'https://avatar.github.com/two',
    id: '2',
    login: 'two',
    name: 'Jane User',
    url: 'https://github.com/two'
  }
];