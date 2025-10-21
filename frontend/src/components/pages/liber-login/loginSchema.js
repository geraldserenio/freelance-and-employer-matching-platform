import * as Yup from "yup";

export const loginFormFields = [
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
];

export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
});
