import React from "react";
import styled from "styled-components";
import { HowItWorksCard } from "../../blocks/how-it-works/HowItWorksCard";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  margin,
  tabletDevice,
} from "../../styles/sizes";
import { HeadingSection } from "../../generic/headers";

export const HowItWorks = ({ howItWorks }) => {
  return (
    <Container>
      <HeadingSection>How it works:</HeadingSection>
      <CardsContainer>
        {howItWorks?.map((data, index) => {
          return (
            <HowItWorksCard
              key={index}
              icon={data?.icon}
              heading={data?.title}
              subHeading={data?.description}
            />
          );
        })}
      </CardsContainer>
    </Container>
  );
};

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 40px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto;
    gap: 40px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 40px;
  }

  @media (min-width: ${largeScreens}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 40px;
  }
`;

const Container = styled.div`
  margin: ${deviceMargin.mobile}px;
  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
  }
`;
