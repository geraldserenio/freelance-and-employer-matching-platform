import React from "react";
import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import {
  ButtonedHeadingSection,
  SubHeadingSection,
} from "../../../shared/generic/headers";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { PremiumFreelancerCard } from "../../../shared/blocks/premium-freelancers/PremiumFreelancerCard";
import { useNavigate } from "react-router-dom";

export const PremiumFreelancers = ({ premiumFreelancers }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <ButtonedHeadingSection>For Businesses</ButtonedHeadingSection>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Search")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection>Premium freelancers</SubHeadingSection>
      </SubHeadingAndIconContainer>
      <PremiumFreelancersContainer>
        {premiumFreelancers?.map((data, index) => {
          return (
            <PremiumFreelancerCard
              key={index}
              image={data?.users?.photo}
              name={data?.users?.first_name}
              jobTitle={data?.users?.job_title}
            />
          );
        })}
        {/* <PremiumFreelancerCard
          image={"Sarah"}
          name={"Sarah"}
          jobTitle="Graphic designer + Web developer"
        />
        <PremiumFreelancerCard
          image={"Khalid"}
          name={"Sarah"}
          jobTitle="Front-end + back-end developer"
        />
        <PremiumFreelancerCard
          image={"Maryam"}
          name={"Maryam"}
          jobTitle="UI / UX designer"
        /> */}
      </PremiumFreelancersContainer>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Search")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/browse-freelancers");
          }}
        >
          Browse freelancers
        </SubHeadingSection>
      </SubHeadingAndIconContainer>
    </Container>
  );
};

const Container = styled.div`
  text-align: start;
  margin-top: 103px;
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
    margin-top: 0;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
    margin-top: 0;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
    margin-top: 0;
  }
`;

const SubHeadingAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

const PremiumFreelancersContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: 2%;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: 2%;
  }
`;
