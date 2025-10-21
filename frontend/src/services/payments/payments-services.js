import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getAllPayments = async (status = null, page = 1, token) => {
  const result = await axios
    .get(`${BASE_URL}admin-payments?status=${status}&&page=${page}`, {
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
  return result;
};

export const getPaymentByFreelancerId = async (
  user_id,
  status = null,
  page = 1,
  token,
) => {
  const result = await axios
    .get(`${BASE_URL}freelancer-payments?user_id=${user_id}&&page=${page}`, {
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
  return result;
};

export const getPaymentByBusinessId = async (
  user_id,
  status = null,
  page = 1,
  token,
) => {
  const url = status
    ? `${BASE_URL}business-payments?user_id=${user_id}&&status=${status}&&page=${page}`
    : `${BASE_URL}business-payments?user_id=${user_id}&&page=${page}`;
  const result = await axios
    .get(url, {
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
  return result;
};

export const updatePaymentStatus = async (data) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .post(`${BASE_URL}update-payment-status`, data, {
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

export const requestWithdrawalByFreelancer = async (data) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  data.freelancer_id = userData?.user?.id;
  const result = await axios
    .post(`${BASE_URL}freelancer-payments`, data, {
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
