import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { fontFamily } from "../../shared/styles/theme";
import { black, gray, primaryColor, white } from "../../shared/styles/color";
import { useNavigate } from "react-router-dom";
import {
  desktopDevice,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <HeadingContainer>
        <LogoContainer>
          <Icon src={generateIcon("Logo")} />
          <LiberText>Liber</LiberText>
        </LogoContainer>
        <ButtonContainer>
          <GetStartedButton onClick={() => navigate("/sign-up")}>
            Get started
          </GetStartedButton>
          <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
        </ButtonContainer>
      </HeadingContainer>
      <RedirectionContaier>
        <LeftContainer>
          <ul>
            <LI>
              <Anchor href="/freelancers-tab">For Freelancers</Anchor>
            </LI>
            <LI>
              <Anchor href="/business-tab">For Businesses</Anchor>
            </LI>
            <LI>
              <Anchor href="/about-us">About Us</Anchor>
            </LI>
            <LI href="/workshops">
              <Anchor href="/workshop">Liber workshops</Anchor>
            </LI>
            <LI href="/job-listings">
              <Anchor href="/job-listings">Job listings</Anchor>
            </LI>
          </ul>
          <ul>
            <LI>Terms of Use</LI>
            <LI>Privacy Policy</LI>
          </ul>
        </LeftContainer>
        <RightContainer>
          <Text>
            Stay updated with the latest news, job opportunities, business
            insights and industry trends in MENA’s dynamic freelance
            market.{" "}
          </Text>
          <SignUpForm>
            <EmailTextBox placeholder="Enter your email" />
            <SignUpButton onClick={() => navigate("/sign-up")}>
              Sign Up
            </SignUpButton>
          </SignUpForm>
        </RightContainer>
      </RedirectionContaier>
    </FooterContainer>
  );
};

const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
`;

const SignUpForm = styled.form`
  display: grid;
  gap: 10px;
  align-items: center;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;

const EmailTextBox = styled.input`
  display: grid;
  height: 56px;
  border-radius: 12px;
  border: 1px solid ${gray};
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  color: ${gray};
  padding-left: 18px;

  @media (min-width: ${tabletDevice}px) {
    height: 56px;
    border-radius: 12px;
    border: 1px solid ${gray};
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0%;
    color: ${gray};
    padding-left: 18px;
  }

  @media (min-width: ${desktopDevice}px) {
    width: 657px;
    height: 56px;
    border-radius: 12px;
    border: 1px solid ${gray};
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0%;
    color: ${gray};
    padding-left: 18px;
  }

  @media (min-width: ${largeScreens}px) {
    width: 657px;
    height: 56px;
    border-radius: 12px;
    border: 1px solid ${gray};
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0%;
    color: ${gray};
    padding-left: 18px;
  }
`;

const Text = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: 0%;
  color: ${black};

  @media (min-width: ${tabletDevice}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0%;
    color: ${black};
  }

  @media (min-width: ${desktopDevice}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0%;
    color: ${black};
    width: 69%;
  }

  @media (min-width: ${largeScreens}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0%;
    color: ${black};
    width: 69%;
  }
`;

const LI = styled.li`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  list-style: none;
  margin-top: 20px;
  color: ${black};
  cursor: pointer;
`;

const FooterContainer = styled.div`
  padding: 40px;
  border-top: 1px solid ${primaryColor};
  margin-top: 65px;
`;

const HeadingContainer = styled.div`
  @media (min-width: ${tabletDevice}px) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const LiberText = styled.label`
  font-family: ${fontFamily.font};
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 10%;
  color: ${primaryColor};
`;

const GetStartedButton = styled.button`
  width: 123px;
  height: 43px;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  background-color: ${primaryColor};
  color: ${white};
  border: 0;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 75px;
  height: 43px;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  background-color: ${white};
  cursor: pointer;
`;

const SignUpButton = styled.button`
  width: 94px;
  height: 43px;
  border-width: 1px;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  background-color: ${white};
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  cursor: pointer;
`;

const RedirectionContaier = styled.div`
  display: grid;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;

const LeftContainer = styled.div`
  text-align: start;
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
  padding: 10px;

  @media (min-width: ${tabletDevice}px) {
    text-align: start;
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
    padding: 10px;
  }

  @media (min-width: ${desktopDevice}px) {
    width: 40%;
    text-align: start;
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
  }

  @media (min-width: ${largeScreens}px) {
    width: 40%;
    text-align: start;
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
  }
`;

const RightContainer = styled.div`
  text-align: start;

  @media (min-width: ${tabletDevice}px) {
    text-align: start;
  }

  @media (min-width: ${desktopDevice}px) {
    width: 60%;
    text-align: start;
  }

  @media (min-width: ${largeScreens}px) {
    width: 60%;
    text-align: start;
  }
`;
