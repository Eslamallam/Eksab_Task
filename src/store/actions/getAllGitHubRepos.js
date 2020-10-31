import * as actionTypes from "./actionTypes";
import { getService } from "../../services/getService";
import { ErrorAlert } from "../../helper/alerts";

export const getAllGitHubPublicRepos = (query) => {
  return async (dispatch) => {
    return await getService("search/repositories", undefined, { ...query })
      .then((resp) => {
        dispatch({
          type: actionTypes.FETCHING_REPOS_SUCCESS,
          payload: resp.data.items,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCHING_REPOS_FAIL,
          error: err,
        });
        ErrorAlert("Oops, " + err);
      });
  };
};
