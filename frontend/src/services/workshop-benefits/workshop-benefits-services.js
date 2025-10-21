import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getWorkShopBenefits = async () => {
  const workshop_benefits = await axios
    .get(`${BASE_URL}workshop-benefits`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return workshop_benefits;
};
