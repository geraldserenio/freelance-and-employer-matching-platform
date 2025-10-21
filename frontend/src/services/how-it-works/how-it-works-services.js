import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getHowItWorks = async (user_type) => {
  const howItWorks = await axios
    .get(`${BASE_URL}how-it-works?user_type=${user_type}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return howItWorks;
};
