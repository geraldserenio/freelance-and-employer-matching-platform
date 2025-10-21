import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { generateIcon, Icon } from "../../icons/generate-icon";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../styles/sizes";

export const PlatformFeatureCard = (props) => {
  const { heading, subHeading, icon } = props;
  return (
    <Container>
      <Icon
        src={generateIcon(icon)}
        style={{ width: "44px", height: "44px" }}
      />
      <Heading>{heading}</Heading>
      <SubHeading>{subHeading}</SubHeading>
    </Container>
  );
};

const Container = styled.div`
  height: 245px;
  border-radius: 20px;
  gap: 10px;
  padding: 30px;
  border: 1px solid #6dbaa2;
  text-align: start;
  @media (min-width: ${tabletDevice}px) {
    height: 245px;
    border-radius: 20px;
    gap: 10px;
    padding: 30px;
    border: 1px solid #6dbaa2;
    text-align: start;
  }

  @media (min-width: ${desktopDevice}px) {
    height: 245px;
    border-radius: 20px;
    gap: 10px;
    padding: 30px;
    border: 1px solid #6dbaa2;
    text-align: start;
  }

  @media (min-width: ${largeScreens}px) {
    height: 245px;
    border-radius: 20px;
    gap: 10px;
    padding: 30px;
    border: 1px solid #6dbaa2;
    text-align: start;
  }
`;

const Heading = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  margin-top: ${gap};
`;

const SubHeading = styled.h2`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
`;
