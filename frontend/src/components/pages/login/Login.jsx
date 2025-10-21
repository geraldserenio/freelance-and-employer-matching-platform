import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authenticate } from "../../../services/authenticate";
import styled from "styled-components";
import {
  black,
  gray,
  white,
  primaryBtnColor,
  contentBg,
} from "../../shared/styles/color";
import { large, small } from "../../shared/styles/sizes";
import { InputField, InputWrapper } from "../../shared/inputs/TextField";
import { fontFamily } from "../../shared/styles/theme";
import { useForm } from "react-hook-form";
import { ErrorMessage, SubHeading } from "../../shared/generic/headers";
import { login } from "../../../redux/reducer/authReducer";

export const Login = () => {
  const dispatch = useDispatch();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const { loginType } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  const onSubmit = async (data) => {
    data.loginType = loginType;
    const response = await authenticate(data);
    if (response?.status == 200) {
      setLoginErrorMessage("");
      dispatch(login(response?.data));
    } else {
      setLoginErrorMessage(response?.data?.message);
    }
  };

  return (
    <ContentContainer>
      <LoginContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginText>G Digital Services</LoginText>
          {loginErrorMessage && (
            <ErrorMessage>{loginErrorMessage}</ErrorMessage>
          )}
          <SubHeading style={{ textTransform: "capitalize" }}>
            {loginType} login
          </SubHeading>
          <InputWrapper>
            <InputField
              placeholder="Email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputField
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "Password is required",
                maxLength: 20,
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputWrapper>

          {/* <TextField placeholder="Password" /> */}

          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </LoginContainer>
    </ContentContainer>
  );
};

const SubmitButton = styled.button`
  color: #ffffff;
  background-color: ${primaryBtnColor};
  height: 45px;
  fontweight: 900;
  width: 100%;
  border-radius: 8px;
  margin-top: ${large + 4}px;
  cursor: pointer;

  &:hover {
    background-color: ${white};
    color: ${black};
  }
`;

const LoginText = styled.h1`
  color: ${black};
  font-family: ${fontFamily.font};
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const LoginContainer = styled.div`
  margin: 10% auto;
  width: 575px;
  padding: ${small}px;
  border-radius: ${small}px;
  height: 34%;
  background-color: ${contentBg};
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
`;
