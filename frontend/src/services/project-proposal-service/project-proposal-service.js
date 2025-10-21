import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const storeProjectProposalService = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(`${BASE_URL}store-project-proposal`, formData, {
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

export const getAlreadyProposedFreelancer = async (project_id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(
      `${BASE_URL}get-already-proposed-freelancer?project_id=${project_id}`,
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

export const getAllProjectProposalByApplicantService = async (page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}get-all-project-proposal-by-applicant?page=${page}`, {
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

export const getAllProjectProposalByBusinessIdService = async (page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .get(`${BASE_URL}get-all-project-proposal-by-client?page=${page}`, {
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

export const acceptOrRejectApplicantService = async (id, status) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .post(
      `${BASE_URL}accept-or-reject-proposal`,
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
