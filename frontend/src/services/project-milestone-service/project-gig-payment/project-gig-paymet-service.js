import axios from "axios";
import { BASE_URL } from "../../../helper/base-url";

export const updateGigPaymentStatus = async (formData) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projects = await axios
    .post(
      `${BASE_URL}update-gig-payment-status
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
