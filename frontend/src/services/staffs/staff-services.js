import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getStaffs = async (page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const staffs = await axios
    .get(`${BASE_URL}staffs?page=${page}`, {
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
  return staffs;
};
