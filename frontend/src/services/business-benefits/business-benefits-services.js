import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getBusinessBenefits = async () => {
  const business_benefits = await axios
    .get(`${BASE_URL}business-benefits`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return business_benefits;
};
