import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../../shared/styles/theme";
import {
  gray,
  panelBackground,
  primaryColor,
  primaryDarkColor,
  white,
} from "../../../shared/styles/color";
import { ApplyContainer, ApplyLink } from "../Listing";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { useNavigate } from "react-router-dom";

export const JobApplicationInfo = (props) => {
  const navigate = useNavigate();
  const {
    heading,
    users,
    location,
    job_title,
    salary,
    contract_type,
    experience_level,
    deadline,
    handleApplyButton,
  } = props;

  return (
    <Container>
      <Heading>{heading ?? ""}</Heading>
      <SubHeading>
        <BackToListingButton onClick={() => navigate("/job-listings")}>
          Back to listings
        </BackToListingButton>
      </SubHeading>
      <Heading>{job_title}</Heading>
      <TagsContainer>
        <TagContanier>
          <TagLabel>Company</TagLabel>
          <Tag>{users?.first_name}</Tag>
        </TagContanier>
        <TagContanier>
          <TagLabel>Location</TagLabel>
          <Tag>{location}</Tag>
        </TagContanier>

        <TagContanier>
          <TagLabel>Contract Type</TagLabel>
          <Tag>{contract_type}</Tag>
        </TagContanier>
        <TagContanier>
          <TagLabel>Experience Level</TagLabel>
          <Tag>{experience_level}</Tag>
        </TagContanier>
        <TagContanier>
          <TagLabel>Salary</TagLabel>
          <Tag>{salary ?? "TBD"}</Tag>
        </TagContanier>

        <TagContanier>
          <TagLabel>Deadline</TagLabel>
          <Tag>{deadline ?? "TBD"}</Tag>
        </TagContanier>
        <ApplyContainer>
          <ApplyLink onClick={handleApplyButton}>Apply</ApplyLink>
          <Icon
            src={generateIcon("ApplyArrow")}
            style={{ height: "24px", width: "24px" }}
          />
        </ApplyContainer>
      </TagsContainer>
    </Container>
  );
};

const TagsContainer = styled.div`
  display: grid;
  justify-content: start;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    justify-content: start;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: space-evenly;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const TagContanier = styled.div`
  display: grid;
  gap: ${gap + 2}px;
`;

const TagLabel = styled.label`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
  color: ${gray};
`;

const Tag = styled.label`
  font-family: ${fontFamily.font};
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

const Heading = styled.p`
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
