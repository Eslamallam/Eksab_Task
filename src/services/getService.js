import Axios from "axios";

export const getService = (
  route,
  headers = {
    Accept: "application/vnd.github.v3+json",
  },
  params = {}
) => {
  return Axios.get(`${route}`, {
    headers: headers,
    params: params,
  });
};
