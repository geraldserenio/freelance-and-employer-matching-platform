import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { primaryColor, white } from "../../../shared/styles/color";
import { fontFamily } from "../../../shared/styles/theme";
import { HomePageButtonContainer } from "../../../navigation/page-header";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { useNavigate } from "react-router-dom";

export const FirstSection = () => {
  const navigate = useNavigate();
  return (
    <FirstSectionContainer>
      <LeftSide>
        <Heading1>
          <Bold>Got a Skill to Share?</Bold>
        </Heading1>
        <Heading2>
          Turn your knowledge into income with <b>Liber Learn</b>.
        </Heading2>
        <Heading2>
          As a freelancer, you can sell your course and reach learners across
          the UAE and the wider MENA region.
        </Heading2>
        <Heading2>
          If you're a Liber subscriber, you can submit your course and we’ll
          support you in getting it in front of the right audience — from
          aspiring professionals to future creators.
        </Heading2>
        <Heading2>
          Whether it's design, development, AI, or something else — your skills
          can create real impact.
        </Heading2>
        <HomePageButtonContainer>
          <GetStartedButton onClick={() => navigate("/sign-up")}>
            Subscribe to Get Started
          </GetStartedButton>
        </HomePageButtonContainer>
      </LeftSide>
      <RightSide>
        <Icon
          src={generateIcon("Homepage1")}
          style={{
            width: "100%",
            height: "459px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </RightSide>
    </FirstSectionContainer>
  );
};

const FirstSectionContainer = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: auto;
  gap: 20px;
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto;
    gap: 20px;
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: 20px;
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: 20px;

    margin: ${deviceMargin.largeScreen}px;
  }
`;

const LeftSide = styled.div`
  padding: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;

  @media (min-width: ${tabletDevice}px) {
    padding: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: ${desktopDevice}px) {
    width: 60%;
    padding: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: ${largeScreens}px) {
    width: 60%;
    padding: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const RightSide = styled.div`
  padding: 0px;
  padding-top: 0px;
  padding-bottom: 0px;

  @media (min-width: ${tabletDevice}px) {
    padding: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: ${desktopDevice}px) {
    width: 60%;
    padding: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: ${largeScreens}px) {
    width: 60%;
    padding: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

export const Bold = styled.span`
  font-family: Poppins;
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0%;

  @media (min-width: ${tabletDevice}px) {
    font-family: Poppins;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    letter-spacing: 0%;
  }

  @media (min-width: ${desktopDevice}px) {
    font-family: Poppins;
    font-weight: 700;
    font-size: 60px;
    line-height: 90px;
    letter-spacing: 0%;
  }

  @media (min-width: ${largeScreens}px) {
    font-family: Poppins;
    font-weight: 700;
    font-size: 60px;
    line-height: 90px;
    letter-spacing: 0%;
  }
`;

export const Heading1 = styled.div`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0%;
  text-align: start;

  @media (min-width: ${tabletDevice}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 20px;
    line-height: 40px;
    letter-spacing: 0%;
    text-align: start;
  }

  @media (min-width: ${desktopDevice}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 60px;
    line-height: 90px;
    letter-spacing: 0%;
    text-align: start;
  }

  @media (min-width: ${largeScreens}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 60px;
    line-height: 90px;
    letter-spacing: 0%;
    text-align: start;
  }
`;

export const Heading2 = styled.div`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 15px;
  line-height: 26px;
  text-align: start;
  margin-bottom: ${gap * 2}px;

  @media (min-width: ${tabletDevice}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 15px;
    line-height: 36px;
    letter-spacing: 0%;
    text-align: start;
  }

  @media (min-width: ${desktopDevice}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0%;
    text-align: start;
  }

  @media (min-width: ${largeScreens}px) {
    font-family: ${fontFamily.font};
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0%;
    text-align: start;
  }
`;

export const GetStartedButton = styled.button`
  width: 224px;
  height: 43px;
  border-radius: 100px;
  padding: 12px 16px 12px 16px;
  background-color: ${primaryColor};
  font-family: ${fontFamily.font};
  color: ${white};
  border: 0;
  cursor: pointer;
`;

const WhyLiber = styled.button`
  width: 119px;
  height: 43px;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  border-width: 2px;
  background-color: transparent;
  border: 2px solid ${primaryColor};
  color: ${primaryColor};
  cursor: pointer;
`;
