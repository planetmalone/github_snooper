import type { RequestError } from 'octokit';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

export interface GitHubUser {
  id: string;
  avatarUrl: string;
  followerCount: number;
  followers: Follower[];
  login: string;
  name: string | null;
  organizations: Organization[];
  repositories: Repository[];
  url: string;
}

export interface Follower {
  id: string;
  avatarUrl: string;
  login: string;
  name: string;
  url: string;
}

export interface Organization {
  id: string;
  avatarUrl: string;
  login: string;
  name: string;
  url: string;
}

export interface Repository {
  id: string;
  description: string;
  forkCount: number;
  name: string;
  primaryLanguage: Language | null;
  stargazerCount: number;
  url: string;
}

export interface Language {
  color: string;
  name: string;
}

export type GitHubUserSummary = Partial<GitHubUser>;

export type GitHubRequestError = RequestError;
export function isGitHubRequestError(obj: any): obj is GitHubRequestError {
  return Boolean((obj as GitHubRequestError).response);
}

export type GitHubSearchUsersResponse = RestEndpointMethodTypes['search']['users']['response']['data'];
export type GitHubSearchUserResponseItem = GitHubSearchUsersResponse['items'][0];
export type GitHubUserResponse = RestEndpointMethodTypes['users']['getByUsername']['response']['data'];

