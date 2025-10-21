import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import styled from "styled-components";
import {
  registrationFormFields,
  registrationInitialValues,
  validationSchema,
} from "./registrationSchema";
import ApplicationField from "../../../../shared/inputs/ApplicationField";
import SubmitButton from "../../../../shared/button/SubmitButton";
import CustomCheckboxRadio from "./CustomCheckboxRadio";
import { ErrorText } from "../../../../shared/inputs/ErrorText";
import SelectionField from "../../../../shared/inputs/SelectionField";
import { signup } from "../../../../../services/users/user-services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../../../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { ButtonSpinner } from "../../../../shared/loading/LoadingScreen";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=demonyms,cca2,name",
        );
        const data = await response.json();

        const nationalityOptions = data
          .map((country) => {
            const nationality = country.demonyms?.eng?.m;
            const code = country.cca2;
            if (nationality && code) {
              return {
                value: code,
                label: nationality,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean)
          .sort((a, b) => a.label.localeCompare(b.label));

        setOptions(nationalityOptions);
      } catch (error) {
        console.error("Failed to fetch nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  return (
    <Container>
      <Title>Register With Liber</Title>
      <Formik
        initialValues={registrationInitialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          const result = await signup(values);
          if (result?.status === 500) {
            Swal.fire({
              title: "Something went wrong!",
              text: "Your email is already registered. Please login instead",
              icon: "error",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            setLoading(false);
          }
          if (result?.status === 201) {
            Swal.fire({
              title: "User created!",
              text: "Your account is created. Please, check your email and verify your account",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then(() => {
              dispatch(login(result?.data));
              Swal.fire({
                title: "First time logged in.",
                text: "Choose plan",
                icon: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/subscribe");
                }
              });
            });
            setLoading(false);
          }
        }}
      >
        {({ handleSubmit }) => {
          return (
            <StyledForm onSubmit={handleSubmit}>
              {/* Single Role Selection */}
              <CheckboxContainer>
                <CustomCheckboxRadio
                  name="user_type"
                  value="freelancers"
                  label="I am a freelancer"
                />
                <CustomCheckboxRadio
                  name="user_type"
                  value="business"
                  label="I am a business"
                />
              </CheckboxContainer>
              <ErrorMessage name="user_type" component={ErrorText} />

              {registrationFormFields.map((field) => (
                <ApplicationField key={field.name} width="100%" {...field} />
              ))}

              <SelectionField
                name="nationality"
                label="Nationality"
                placeholder="Select"
                options={options}
              />

              {loading ? <ButtonSpinner /> : <SubmitButton disabled={false} />}
            </StyledForm>
          );
        }}
      </Formik>
    </Container>
  );
};

export default RegistrationForm;

export const Container = styled.div`
  min-height: 35rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Title = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 35px;
  line-height: 60px;
  margin-bottom: 2rem;
  width: 100%;
  text-align: left;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  border-radius: 8px;
  align-items: flex-start;
  justify-content: flex-start;
`;
