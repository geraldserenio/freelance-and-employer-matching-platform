import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import {
  black,
  gray,
  panelBackground,
  primaryColor,
  primaryDarkColor,
  white,
} from "../../shared/styles/color";
import { fontFamily } from "../../shared/styles/theme";

export const ProjectInfo = (props) => {
  const navigate = useNavigate();
  const { heading, status, project_name, payment_conditions, deadline } = props;

  return (
    <Container>
      <Heading>{heading ?? ""}</Heading>
      <SubHeading>
        <BackToListingButton onClick={() => navigate("/projects")}>
          Back to project list
        </BackToListingButton>
      </SubHeading>
      <Heading>{project_name ?? ""}</Heading>
      <TagsContainer>
        <TagContanier>
          <TagLabel>Deadline</TagLabel>
          <Tag>{deadline ?? ""}</Tag>
        </TagContanier>
        <TagContanier>
          <TagLabel>Payment condition</TagLabel>
          <Tag>{payment_conditions ?? ""}</Tag>
        </TagContanier>
        <TagContanier>
          <TagLabel>Status</TagLabel>
          <Tag>{status ?? ""}</Tag>
        </TagContanier>
      </TagsContainer>
    </Container>
  );
};

export const TagsContainer = styled.div`
  display: grid;
  justify-content: start;
  gap: ${gap}px;
  margin-bottom: ${gap + 5}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    justify-content: start;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const TagContanier = styled.div`
  display: grid;
  gap: ${gap + 2}px;
`;

export const TagLabel = styled.label`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
  color: ${black};
  display: flex;
  align-items: center;
`;

export const Tag = styled.label`
  font-family: ${fontFamily.f};
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
  color: ${primaryDarkColor};
`;

const Container = styled.div`
  background-color: ${panelBackground};
  text-align: start;
  padding: 72px;
  padding-top: 52px;
  padding-bottom: 42px;
  border-radius: 0px 0px 40px 40px;
  margin-bottom: 20px;
`;

export const Heading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -2%;
  color: ${primaryDarkColor};
`;

const SubHeading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 42px;
  line-height: 50.4px;
  color: ${white};
  margin-bottom: 0;
`;

export const BackToListingButton = styled.button`
  width: auto;
  height: auto;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  color: ${primaryColor};
  border: 1px solid ${primaryColor};
  background-color: transparent;
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
  letter-spacing: 0%;
  cursor: pointer;
  margin-top: ${gap * 3}px;
`;
