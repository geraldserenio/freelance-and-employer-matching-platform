import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import {
  ButtonedHeadingSection,
  SubHeading,
} from "../../../shared/generic/headers";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { FreelancerHeadingTitle } from "../../../shared/freelancer-heading-title/FreelancerHeadingTitle";

export const HeadingSection = () => {
  return (
    <FirstSectionContainer>
      <LeftSide>
        <ButtonedHeadingSection style={ButtonedHeadingStyles}>
          For Freelancers
        </ButtonedHeadingSection>
        <Heading1>
          Find work that fits
          <Bold> your skills</Bold> and <Bold>schedule</Bold>.
        </Heading1>
        <OurClientsContainer>
          <SubHeading>Our Clients</SubHeading>
          <LogosContainer>
            <Icon
              src={generateIcon("UnitedArabEmiratesMinistryOfEconomy")}
              style={{ width: "270px", height: "80px" }}
            />
          </LogosContainer>
        </OurClientsContainer>
      </LeftSide>
      <RightSide>
        <FreelancerHeadingTitle
          cssStyles={BottomTitleStyles}
          title={"UX Designer"}
        />
        <FreelancerHeadingTitle
          title={"Graphic designer + Web developer"}
          cssStyles={TopRightTitleStyles}
        />
        <Icon
          src={generateIcon("FreelancerImage")}
          style={{ width: "100%", height: "auto" }}
        />
      </RightSide>
    </FirstSectionContainer>
  );
};

const BottomTitleStyles = { left: "23px", bottom: "56px" };
const TopRightTitleStyles = { right: "23px", top: "30px" };

const LogosContainer = styled.div`
  display: grid;
  gap: ${gap + 10}px;
  justify-content: center;

  @media (min-width: ${tabletDevice}px) {
    display: flex;
    justify-content: start;
    gap: ${gap + 10}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: ${gap + 10}px;
    justify-content: start;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: ${gap + 10}px;
    justify-content: start;
  }
`;

const ButtonedHeadingStyles = {
  fontSize: "18px",
  paddingTop: "8px",
  paddingRight: "18px",
  paddingBottom: "8px",
  paddingLeft: "18px",
};

const OurClientsContainer = styled.div``;

const FirstSectionContainer = styled.div`
  display: grid;
  margin-top: 60px;
  gap: ${gap + 50}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    margin-top: 60px;
    gap: ${gap + 50}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    margin-top: 60px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    margin-top: 60px;
  }
`;

const LeftSide = styled.div`
  padding: 35px;
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: start;
`;

const RightSide = styled.div`
  position: relative;

  /* Tablet: Two columns */
  @media (min-width: ${tabletDevice}px) {
    position: relative;
  }

  /* Desktop: Three columns */
  @media (min-width: ${desktopDevice}px) {
    position: relative;
    width: 40%;
  }

  /* Large screens: Four columns */
  @media (min-width: ${largeScreens}px) {
    position: relative;
    width: 40%;
  }
`;

const Bold = styled.b`
  font-family: Poppins;
  font-weight: 700;
  font-size: 60px;
  line-height: 90px;
  letter-spacing: 0%;
`;

const Heading1 = styled.h1`
  font-family: Poppins;
  font-weight: 400;
  font-size: 60px;
  line-height: 90px;
  letter-spacing: 0%;
  text-align: start;
`;
