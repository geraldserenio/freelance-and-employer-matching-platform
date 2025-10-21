import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getPlatformFeatures = async () => {
  const platform_features = await axios
    .get(`${BASE_URL}platform-features`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return platform_features;
};
