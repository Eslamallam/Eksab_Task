import * as actionTypes from "./actionTypes";
import { getService } from "../../services/getService";
import { baseURL } from "../../baseURL";
import { ErrorAlert } from "../../helper/alerts";

export const getAllGitHubPublicRepos = (query) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.START_FETCHING_REPOS });

    return await getService(baseURL, undefined, { ...query })
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
