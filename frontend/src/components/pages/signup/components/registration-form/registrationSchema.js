import * as Yup from "yup";

export const registrationFormFields = [
  { name: "first_name", type: "text", placeholder: "First Name" },
  { name: "last_name", type: "text", placeholder: "Last Name" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Create Password" },
  { name: "password2", type: "password", placeholder: "Retype Password" },
];

export const registrationInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
  user_type: "",
  nationality: "", // Added nationality
};

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .test(
      "no-only-spaces",
      "First name cannot be empty or only spaces",
      (value) => value?.trim().length > 0,
    )
    .required("First name is required"),
  last_name: Yup.string()
    .test(
      "no-only-spaces",
      "Last name cannot be empty or only spaces",
      (value) => value?.trim().length > 0,
    )
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email")
    .test(
      "no-only-spaces",
      "Email cannot be empty or only spaces",
      (value) => value?.trim().length > 0,
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .test(
      "no-only-spaces",
      "Password cannot be empty or only spaces",
      (value) => value?.trim().length > 0,
    )
    .required("Password is required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .test(
      "no-only-spaces",
      "Confirm password cannot be empty or only spaces",
      (value) => value?.trim().length > 0,
    )
    .required("Confirm password is required"),
  user_type: Yup.string()
    .oneOf(["freelancers", "business"], "Invalid role selection")
    .required("Role is required"),
  nationality: Yup.string().required("Nationality is required"),
});
