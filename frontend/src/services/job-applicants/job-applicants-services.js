import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getAllActiveProjectsByFreelancerService = async (
  user_id = null,
  page = 1,
  token,
) => {
  const result = await axios
    .get(`${BASE_URL}client-jobs?user_id=${user_id}&&page=${page}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return result;
};

export const checkAlreadyApplied = async (data) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  data.user_id = userData?.user?.id;
  const result = await axios
    .post(`${BASE_URL}check-already-applied`, data, {
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
  return result;
};

export const updateApplicationStatus = async (data) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .post(`${BASE_URL}update-application-status`, data, {
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
  return result;
};
