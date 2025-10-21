import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getSubscriptions = async (token = null, subscriptionType) => {
  const subscriptions = await axios
    .get(`${BASE_URL}subscriptions?type=${subscriptionType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const subscribe = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(`${BASE_URL}subscribe`, formData, {
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
  return projects;
};

export const updateSubscriptionStatus = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(
      `${BASE_URL}update-subscription-status
`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      },
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return projects;
};
