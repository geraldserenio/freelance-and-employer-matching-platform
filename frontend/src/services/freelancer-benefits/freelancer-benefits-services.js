import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getFreelancerBenefits = async () => {
  const freelancer_benefits = await axios
    .get(`${BASE_URL}freelancer-benefits`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return freelancer_benefits;
};
