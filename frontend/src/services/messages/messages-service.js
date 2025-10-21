import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const sendMessage = async (data) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .post(`${BASE_URL}send-message`, data, {
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

export const sendGuestMessage = async (data) => {
  const result = await axios
    .post(`${BASE_URL}store-guest-message`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return result;
};

export const getGuestConversation = async (sender) => {
  const result = await axios
    .get(`${BASE_URL}get-guest-conversation?sender=${sender}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return result;
};

export const getConversation = async (recipient, sender, page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .get(
      `${BASE_URL}get-conversation?recipient=${recipient}&&sender=${sender}&&page=${page}`,
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
  return result;
};

export const getConversationListService = async (recipient, page) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const result = await axios
    .get(
      `${BASE_URL}get-conversation-list?recipient=${recipient}&&page=${page}`,
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
  return result;
};

export const unsendMessage = async (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const users = await axios
    .post(
      `${BASE_URL}unsend-message`,
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
