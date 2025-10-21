import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getPrograms = async ({ page, limit }) => {
  const config = {
    params: {
      page: page,
      limit: limit,
    },
  };
  const programs = await axios
    .get(`${BASE_URL}workshop-programs`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return programs;
};
