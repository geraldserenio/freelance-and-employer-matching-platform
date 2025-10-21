import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getUsers = async (page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .get(`${BASE_URL}users?page=${page}`, {
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
  return users;
};

export const browseFreelancerService = async (page, filters) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(
      `${BASE_URL}browse-freelancers?page=${page}&&filters=${encodeURIComponent(JSON.stringify(filters))}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const enableDisableUser = async (status, id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .post(
      `${BASE_URL}enable-disable-user`,
      { is_active: status, id: id },
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
  return users;
};

export const signup = async (data) => {
  const user = await axios
    .post(`${BASE_URL}signup`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return user;
};

export const getUserById = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .get(`${BASE_URL}users/${id}`, {
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
  return users;
};

export const verifyUser = async (id, token) => {
  const users = await axios
    .get(`${BASE_URL}verify?id=${id}&&token=${token}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return users;
};

export const updateProfile = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const profile = await axios
    .post(`${BASE_URL}update-profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData?.token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return profile;
};
