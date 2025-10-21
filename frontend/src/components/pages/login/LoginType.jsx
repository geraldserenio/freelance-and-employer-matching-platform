import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  black,
  white,
  primaryBtnColor,
  contentBg,
} from "../../shared/styles/color";
import { large, small } from "../../shared/styles/sizes";
import { fontFamily } from "../../shared/styles/theme";
import { PrimaryButton, SecondaryButton } from "../../shared/inputs/Button";
import { SubHeading } from "../../shared/generic/headers";
import { useNavigate } from "react-router-dom";

export const LoginType = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  const handleNavigate = (loginType) => {
    const data = { loginType: loginType };
    navigate("/login", { state: data });
  };

  return (
    <ContentContainer>
      <LoginContainer>
        <LoginText>G Digital Services</LoginText>
        <SubHeading>Login as</SubHeading>
        <ButtonContainer>
          <SecondaryButton onClick={() => handleNavigate("client")}>
            Client
          </SecondaryButton>
          <PrimaryButton onClick={() => handleNavigate("staff")}>
            Staff
          </PrimaryButton>
        </ButtonContainer>
      </LoginContainer>
    </ContentContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
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
