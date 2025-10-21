import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getWhyChooseLiberByUserType = async (user_type) => {
  const whyChooseLiber = await axios
    .get(`${BASE_URL}why-choose-liber/${user_type}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return whyChooseLiber;
};
