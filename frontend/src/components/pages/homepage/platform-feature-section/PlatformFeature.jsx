import React from "react";
import styled from "styled-components";
import { HeadingSection } from "../../../shared/generic/headers";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { PlatformFeatureCard } from "../../../shared/blocks/platform-features/PlatformFeatureCard";

export const PlatformFeature = ({ platformFeatures }) => {
  return (
    <Container>
      <HeadingSection>Platform features</HeadingSection>
      <PlatformFeatureContainer>
        {platformFeatures?.map((data) => {
          return (
            <PlatformFeatureCard
              key={data?.title}
              heading={data?.title}
              subHeading={data?.description}
              icon={data?.icon}
            />
          );
        })}
      </PlatformFeatureContainer>
    </Container>
  );
};

const Container = styled.div`
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

const PlatformFeatureContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: auto;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 60px;
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
