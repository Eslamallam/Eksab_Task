import Axios from "axios";

export const getService = (
  route,
  headers = {
    Accept: "application/vnd.github.v3+json",
  },
  params = {}
) => {
  return Axios.get(`${process.env.REACT_APP_BASE_URL}${route}`, {
    headers: headers,
    params: params,
  });
};
