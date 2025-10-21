import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../icons/generate-icon";
import { fontFamily } from "../../styles/theme";
import { desktopDevice, largeScreens, tabletDevice } from "../../styles/sizes";

export const PremiumFreelancerCard = (props) => {
  const { name, jobTitle, image, imageStyle, containerStyles } = props;

  return (
    <CardContainer style={containerStyles || {}}>
      <Icon
        src={generateIcon(image)}
        style={
          imageStyle || {
            width: "98%",
            height: "436px",
            top: "2899px",
            left: "41px",
            borderRadius: "20px",
          }
        }
      ></Icon>
      <FreelancerNameContainer>
        <FreelancerName>{name}</FreelancerName>
        <FreelancerJobTitle>{jobTitle}</FreelancerJobTitle>
      </FreelancerNameContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  position: relative;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    position: relative;
    grid-template-columns: auto;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    position: relative;
    width: 33.33%;
    justify-content: center;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    position: relative;
    width: 33.33%;
    justify-content: center;
  }
`;

const FreelancerNameContainer = styled.div`
  position: absolute;
  width: 77%;
  bottom: 20px;
  left: 30px;
  min-height: 85px;
  height: auto;
  border-radius: 20px;
  padding-top: 12px;
  padding-right: 20px;
  padding-bottom: 12px;
  padding-left: 20px;
  background-color: #1d1e2b;
`;

const FreelancerName = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: #ffffff;
  margin-bottom: 0;
`;

const FreelancerJobTitle = styled.span`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #ffffff;
`;
