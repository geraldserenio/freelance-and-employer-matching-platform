import React from "react";
import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import {
  ButtonedHeadingSection,
  SubHeadingSection,
} from "../../../shared/generic/headers";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { OpportunitiesCard } from "../../../shared/blocks/multiple-opportunities/OpportunitiesCard";
import { useNavigate } from "react-router-dom";

export const MultipleOpportunities = ({ multipleOpportunities }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ButtonedHeadingSection>For Freelancers</ButtonedHeadingSection>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Search")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection>Multiple opportunities</SubHeadingSection>
      </SubHeadingAndIconContainer>
      <OpportunitiesContainer>
        {multipleOpportunities?.map((data) => {
          return (
            <OpportunitiesCard
              title={data?.title}
              icon={data?.icon}
              key={data?.title}
            />
          );
        })}
      </OpportunitiesContainer>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Search")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/browse-projects");
          }}
        >
          Browse projects
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

// overflow-x: auto;

//   @media (min-width: 1025px) {
//     overflow-x: hidden;
//   }

const SubHeadingAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

export const OpportunitiesContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 20px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
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

//min-width: 800px;
