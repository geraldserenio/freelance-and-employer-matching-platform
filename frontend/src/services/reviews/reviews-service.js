import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getReviews = async ({ page, limit, isStudent }) => {
  const config = {
    params: {
      page: page,
      limit: limit,
      is_student: isStudent,
    },
  };
  const reviews = await axios
    .get(`${BASE_URL}reviews`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return reviews;
};

export const getRecommendedProjectByUserId = async (user_id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const subscriptions = await axios
    .get(`${BASE_URL}get-recommended-project?user_id=${user_id}`, {
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
