import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getListOfCoursesByUserId = async (page, user_id, token) => {
  const projects = await axios
    .get(`${BASE_URL}freelancer-courses?page=${page}`, {
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
  return projects;
};

export const storeCourseService = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(`${BASE_URL}freelancer-courses`, formData, {
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

export const getBrowseCoursesService = async (page, category) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}browse-courses?page=${page}&&category=${category}`, {
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

export const getCourseByIdService = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}freelancer-courses/${id}`, {
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

export const deleteCourse = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .post(
      `${BASE_URL}delete-course`,
      { id: id },
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

export const updatePublishStatusByIdController = async (id, status) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .post(
      `${BASE_URL}update-course-status`,
      { id: id, status: status },
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
