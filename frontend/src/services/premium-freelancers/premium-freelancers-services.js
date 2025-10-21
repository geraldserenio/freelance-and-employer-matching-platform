import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getPremiumFreelancers = async () => {
  const premiumFreelancers = await axios
    .get(`${BASE_URL}premium-freelancers`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return premiumFreelancers;
};
