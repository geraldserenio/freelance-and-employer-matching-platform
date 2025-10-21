import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getAllJobListingByBusiness = async (
  user_id = null,
  page = 1,
  token,
) => {
  const result = await axios
    .get(`${BASE_URL}list-job?user_id=${user_id}&&page=${page}`, {
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

export const getJobListingList = async (
  jobId = null,
  status,
  page = 1,
  filters,
) => {
  const job_listing = await axios
    .get(
      `${BASE_URL}job-listing?status=${status}&&id=${jobId}&&page=${page}&&filters=${encodeURIComponent(JSON.stringify(filters))}`,
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return job_listing;
};

export const postJobsService = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  formData.created_by = userData?.user?.id;
  const result = await axios
    .post(`${BASE_URL}list-job`, formData, {
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

export const getJobListingByIdService = async (id = null, token) => {
  const result = await axios
    .get(`${BASE_URL}list-job/${id}`, {
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

export const deleteJob = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .delete(`${BASE_URL}list-job/${id}`, {
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

export const getJobListingByFilter = async (data, page = 1) => {
  const job_listing = await axios
    .post(`${BASE_URL}job-listing?page=${page}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return job_listing;
};

export const apply = async (token, formData) => {
  const application = await axios
    .post(`${BASE_URL}apply`, formData, {
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
  return application;
};
