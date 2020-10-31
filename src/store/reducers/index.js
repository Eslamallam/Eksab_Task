import { getAllGitHubPublicRepos } from "./getAllGitHubRepos";

export const rootReducer = {
  getAllRepos: getAllGitHubPublicRepos,
};
