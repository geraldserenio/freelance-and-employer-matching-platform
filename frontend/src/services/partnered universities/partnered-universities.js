import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getPartneredUniversities = async ({ page, limit }) => {
  const config = {
    params: {
      page: page,
      limit: limit,
    },
  };
  const partnered_universitiess = await axios
    .get(`${BASE_URL}partnered-universities`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return partnered_universitiess;
};
