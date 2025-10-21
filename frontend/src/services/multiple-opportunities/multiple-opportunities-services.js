import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getMultipleOpportunities = async () => {
  const multiple_opportunities = await axios
    .get(`${BASE_URL}multiple-opportunities`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return multiple_opportunities;
};
