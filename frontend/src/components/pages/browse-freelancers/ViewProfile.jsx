import React from "react";
import styled from "styled-components";
import { TagLabel } from "../projects/ProjectInfo";
import { StyledInput } from "../../shared/inputs/LoginField";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { BASE_URL } from "../../../helper/base-url";
import { gap } from "../../shared/styles/sizes";
import {
  gray,
  panelBackground,
  primaryDarkColor,
} from "../../shared/styles/color";
import { fontFamily } from "../../shared/styles/theme";
import { SaveButton } from "../projects/AddProject";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export const ViewProfile = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ borderRadius: "12px", backgroundColor: panelBackground }}>
        <NameSectionContainer>
          {" "}
          <NameContainer>
            <div>
              <Heading style={{ fontWeight: "bold" }}>
                {props?.first_name}
              </Heading>
              <ProjectClient>{props?.job_title}</ProjectClient>
            </div>
            <div>
              <Heading style={{ fontWeight: "bold" }}>
                {props?.middle_name}
              </Heading>
            </div>
            <div>
              <Heading style={{ fontWeight: "bold" }}>
                {props?.last_name}
              </Heading>
            </div>
          </NameContainer>
          <div>
            <Icon
              style={{ height: "100px", width: "100px" }}
              src={
                props?.photo
                  ? `${BASE_URL}uploads/${props?.photo}`
                  : generateIcon("Empty")
              }
            />
            {props?.reviews?.length > 0 && (
              <div style={{ color: "#f5c518" }}>
                <FaStar /> {props?.reviews[0]?.reviews} ★
              </div>
            )}
          </div>
        </NameSectionContainer>
        <NameSectionContainer>
          {" "}
          <AdressContainer>
            <div>
              <TagLabel>address</TagLabel>
              {props?.address}
            </div>
            <div>
              <TagLabel>Level</TagLabel>
              {props?.experience_level}
            </div>
            <div>
              <TagLabel>Year(s) of experience</TagLabel>
              {props?.years_of_experience}
            </div>
          </AdressContainer>
        </NameSectionContainer>
      </div>

      <SkillsAndExperienceContainer>
        <div>
          <div>
            <b>Experiences</b>
          </div>
          {props?.experiences?.map((data, index) => (
            <div>{data?.experience_name}</div>
          ))}
        </div>
        <div>
          <div>
            <b>Skills</b>
          </div>
          {props?.skills?.map((data, index) => (
            <div>{data?.skill_name}</div>
          ))}
        </div>
      </SkillsAndExperienceContainer>
      <div style={{ textAlign: "right", marginTop: gap * 3 }}>
        <SaveButton
          onClick={() => {
            navigate("/messages", {
              state: {
                recipientId: props?.id,
                photo: props?.photo,
                fullname: `${props?.first_name} ${props?.middle_name} ${props?.last_name}`,
              },
            });
          }}
        >
          Send Message
        </SaveButton>
      </div>
    </Container>
  );
};
const Container = styled.div``;
const NameSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${gap}px;
`;

const NameContainer = styled.div`
  display: flex;
  gap: ${gap}px;
`;

const AdressContainer = styled.div`
  display: flex;
  gap: ${gap}px;
  width: 100%;
  justify-content: space-evenly;
  margin-top: ${gap * 6}px;
`;

const Heading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: -2%;
  color: ${primaryDarkColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
`;

const SkillsAndExperienceContainer = styled.div`
  display: flex;
  border-top: 1px solid ${gray};
  justify-content: space-between;
  margin-top: ${gap}px;
  padding: ${gap}px;
  padding-left: 0;
  padding-right: 0;
`;

const ProjectClient = styled.p`
  margin: 0;
  font-weight: 500;
  color: #666;
`;
