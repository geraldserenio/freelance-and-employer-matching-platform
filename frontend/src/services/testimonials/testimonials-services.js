import axios from "axios";
import { BASE_URL } from "../../helper/base-url";

export const getTestimonials = async () => {
  const testimonials = await axios
    .get(`${BASE_URL}testimonials`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return testimonials;
};

export const getTestimonialsByUserType = async (user_type) => {
  const testimonials = await axios
    .get(`${BASE_URL}testimonials/${user_type}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return testimonials;
};
