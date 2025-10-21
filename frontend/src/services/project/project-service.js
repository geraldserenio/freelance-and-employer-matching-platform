import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getProjecStats = async ({ user_id }) => {
  const config = {
    params: {
      user_id: user_id,
    },
  };

  const project_stats = await axios
    .get(`${BASE_URL}project-stats`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return project_stats;
};

export const getFreelancerActiveProjects = async ({ user_id }) => {
  const config = {
    params: {
      user_id: user_id,
    },
  };

  const active_projects = await axios
    .get(`${BASE_URL}active-projects`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return active_projects;
};

export const getRecommendedProject = async () => {
  const recommended_project = await axios
    .get(`${BASE_URL}recommended-project`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return recommended_project;
};

export const getListOfProjectsByBusinessId = async (page, user_id, token) => {
  const projects = await axios
    .get(`${BASE_URL}projects?page=${page}&&user_id=${user_id}`, {
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

export const browseProjectService = async (page, filters) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(
      `${BASE_URL}browse-projects?page=${page}&&filters=${encodeURIComponent(JSON.stringify(filters))}`,
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

export const getAllOfProjectsByBusinessIdForDropdown = async (
  user_id,
  token,
) => {
  const projects = await axios
    .get(`${BASE_URL}projects-dropdown?user_id=${user_id}&&status=open`, {
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

export const reviewProjectService = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(`${BASE_URL}project-review`, formData, {
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

export const storeProjectService = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(`${BASE_URL}projects`, formData, {
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

export const getProjectByIdService = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}projects/${id}`, {
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

export const getProjectByDeadlineService = async (deadline) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}projects-deadline/${deadline}`, {
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

export const deleteProject = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .post(
      `${BASE_URL}delete-project`,
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
