import axios from "axios";
import { BASE_URL } from "../helper/base-url.js";

export const authenticate = async (data) => {
  const user = await axios
    .post(`${BASE_URL}authenticate`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return user;
};
