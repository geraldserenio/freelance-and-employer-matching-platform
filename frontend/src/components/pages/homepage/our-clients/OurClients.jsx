import React from "react";
import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { SubHeadingSection } from "../../../shared/generic/headers";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { OurClientCard } from "../../../shared/blocks/our-clients/OurClientCard";

export const OurClients = () => {
  return (
    <Container>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Building")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection>Our clients</SubHeadingSection>
      </SubHeadingAndIconContainer>
      <OurClientsContainer>
        <Icon
          src={generateIcon("UnitedArabEmiratesMinistryOfEconomy")}
          style={{ width: "270px", height: "80px" }}
        />
        <Icon
          src={generateIcon("NationalCharitySchool")}
          style={{ width: "90%", height: "148px" }}
        />
      </OurClientsContainer>
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

const OurClientsContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
  padding: 10px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    gap: 10px;
    padding: 10px;
  }

  @media (min-width: ${largeScreens}px) {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    gap: 10px;
    padding: 10px;
  }
`;
