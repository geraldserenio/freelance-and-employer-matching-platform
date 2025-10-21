import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getSpecificProjectMilestoneByIdService = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}get-specific-project-milestone-by-id/${id}`, {
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

export const getSpecificProjectMilestoneByActualIdService = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}get-specific-project-milestone-by-actualid/${id}`, {
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

export const storeMilestone = async (data) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .post(`${BASE_URL}store-milestone`, data, {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
        "Content-Type": "multipart/form-data",
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

export const getNeedsRevisionProjectMilestoneByIdService = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}get-needs-revision-project-milestone-by-id`, {
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

export const getPendingProjectMilestoneByIdService = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}get-pending-project-milestone-by-id`, {
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

export const getAlreadySubmittedMilestoneFreelancer = async (
  project_applicants_id,
) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(
      `${BASE_URL}get-already-submitted-milestone-freelancer?project_applicants_id=${project_applicants_id}`,
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

export const updateStatusToNeedsRevisionService = async (id, newRemarks) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(
      `${BASE_URL}update-status-to-needs-revision`,
      { id: id, newRemarks: newRemarks },
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
