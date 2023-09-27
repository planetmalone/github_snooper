export const searchQuery = `
  query search($type: SearchType!, $search: String!, $numberOfResults: Int) {
    search(type: $type, query: $search, first: $numberOfResults) {
      nodes {
        __typename
        ... on User {
          id
          avatarUrl
          login
          name
        }
      }
    }
  }
`;

export const userQuery = `
  query getUser($login: String!) {
    user(login: $login) {
      id
      avatarUrl
      followers(first: 5) {
        totalCount
        nodes {
          __typename 
          ... on User {
            id
            avatarUrl
            login
            url
          }
        }
      }
      login
      name
      organizations(first: 100) {
        nodes {
          id
          avatarUrl
          login
          name
          url
        }
      }
      repositories(first: 100) {
        nodes {
          id
          description
          forkCount
          name
          primaryLanguage {
            color
            name
          }
          stargazerCount
          url
        }
      }
      url
    }
  }
`;