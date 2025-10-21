import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { primaryColor, white } from "../../shared/styles/color";
import { fontFamily } from "../../shared/styles/theme";
import { useNavigate } from "react-router-dom";
import {
  desktopDevice,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import UserMenu from "../../pages/Dashboard/UserMenu";

export const PageHeader = (props) => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  return (
    <PageHeaderContainer>
      <LinksAndIconContainer>
        <Href onClick={() => navigate("/home")}>
          <Icon
            src={generateIcon("Logo")}
            style={{ height: "40px", width: "40px" }}
          />
        </Href>
        <LinksContainer>
          <HeaderLink>
            <Href onClick={() => navigate("/freelancers-tab")}>
              For Freelancers
            </Href>
          </HeaderLink>
          <HeaderLink onClick={() => navigate("/business-tab")}>
            For Businesses
          </HeaderLink>
          <HeaderLink onClick={() => navigate("/workshop")}>
            Liber Workshops
          </HeaderLink>
          <HeaderLink onClick={() => navigate("/job-listings")}>
            Job Listings
          </HeaderLink>{" "}
          <HeaderLink onClick={() => navigate("/liber-learn")}>
            Liber Learn
          </HeaderLink>{" "}
          <HeaderLink onClick={() => navigate("/about-us")}>
            About us
          </HeaderLink>
        </LinksContainer>
      </LinksAndIconContainer>
      {!loggedInUser ? (
        <ButtonContainer>
          <SignUpButton onClick={() => navigate("/sign-up")}>
            Sign Up
          </SignUpButton>
          <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
        </ButtonContainer>
      ) : (
        <UserMenu />
      )}
    </PageHeaderContainer>
  );
};

const Href = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

export const LinksAndIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLink = styled.li`
  list-style: none;
  cursor: pointer;
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
`;

export const LinksContainer = styled.ul`
  /* Mobile */
  display: none;

  @media (min-width: ${tabletDevice}px) {
    display: none;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: 20px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: 20px;
  }
`;

export const ButtonContainer = styled.div`
  /* Mobile */
  display: none;

  @media (min-width: ${tabletDevice}px) {
    display: none;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: 10px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: 10px;
  }
`;

export const HomePageButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

export const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${primaryColor};
  padding: 20px;
  position: sticky;
  top: 0;
  background: ${white};
  z-index: 10000;
`;

export const SignUpButton = styled.button`
  width: 93px;
  height: 43px;
  border-radius: 100px;
  padding: 12px 16px 12px 16px;
  background-color: ${primaryColor};
  color: ${white};
  border: 0;
  cursor: pointer;
  font-family: ${fontFamily.font};
`;

export const LoginButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-family: ${fontFamily.font};
`;
