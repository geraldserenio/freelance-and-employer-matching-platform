import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getSubscribers = async (page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const subscriptions = await axios
    .get(`${BASE_URL}get-all-subscribed?page=${page}`, {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return subscriptions;
};
