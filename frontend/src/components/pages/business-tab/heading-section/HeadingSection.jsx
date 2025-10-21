import React from "react";
import styled from "styled-components";
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
import { OpportunitiesCard } from "../../../shared/blocks/multiple-opportunities/OpportunitiesCard";
import { gray, primaryDarkColor, white } from "../../../shared/styles/color";
import { PremiumFreelancerCard } from "../../../shared/blocks/premium-freelancers/PremiumFreelancerCard";

export const HeadingSection = () => {
  return (
    <FirstSectionContainer>
      <LeftSide>
        <ButtonedHeadingSection style={ButtonedHeadingStyles}>
          For Businesses
        </ButtonedHeadingSection>
        <Heading1>
          Hire skilled freelancers
          <Bold> with ease</Bold>
        </Heading1>
        <OurClientsContainer>
          <SubHeading>Over 15+ categories of expertise:</SubHeading>
          <LogosContainer>
            <OpportunitiesCard
              title="Graphic Design"
              icon="GraphicDesignBlack"
              styles={OpportunitiesCardStyles}
              textStyles={OpportunitiesTextStyles}
              iconStyles={iconStyles}
            />
            <OpportunitiesCard
              title="Web Development"
              icon="WebDevelopmentBlack"
              styles={OpportunitiesCardStyles}
              textStyles={OpportunitiesTextStyles}
              iconStyles={iconStyles}
            />
            <OpportunitiesCard
              title="UX/UI Design"
              icon="UIUXBlack"
              styles={OpportunitiesCardStyles}
              textStyles={OpportunitiesTextStyles}
              iconStyles={iconStyles}
            />
          </LogosContainer>
        </OurClientsContainer>
      </LeftSide>
      <RightSide>
        <PremiumFreelancerCard
          containerStyles={Container1Styles}
          image={"Maryam"}
          name={"Maryam"}
          jobTitle="Graphic designer + Web developer"
        />
        <PremiumFreelancerCard
          containerStyles={Container2Styles}
          image={"Khalid"}
          name={"Khalid"}
          imageStyle={Image2Styles}
          jobTitle="Graphic designer + Web developer"
        />
      </RightSide>
    </FirstSectionContainer>
  );
};

const Container1Styles = { width: "auto", position: "relative", zIndex: "2" };

const Image2Styles = {
  width: "90%",
  height: "400px",
  top: "2899px",
  left: "41px",
  borderRadius: "20px",
  marginTop: "20px",
};

const Container2Styles = {
  width: "auto",
  position: "relative",
  zIndex: "1",
  marginLeft: "-90px",
};

const OpportunitiesCardStyles = {
  width: "auto",
  height: "auto",
  borderRadius: "20px",
  padding: "12px",
  backgroundColor: white,
  border: `1px solid ${gray}`,
  color: "red",
};

const iconStyles = { height: "42.49px", width: "40px" };

const OpportunitiesTextStyles = {
  color: primaryDarkColor,
  marginTop: "13px",
  fontSize: "14px",
};

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
    justify-content: space-between;
    margin-top: 60px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-between;
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
  display: none;

  @media (min-width: ${tabletDevice}px) {
    display: none;
  }

  @media (min-width: ${desktopDevice}px) {
    display: none;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
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
