import React from "react";
import styled from "styled-components";
import { black, green, white } from "../../styles/color";
import { fontFamily } from "../../styles/theme";
import { gap } from "../../styles/sizes";

export const RecommendedProjectCard = (props) => {
  const { project_name, skills, styles } = props;

  return (
    <Container style={styles}>
      <RecommendedProjectHeading>Recommended Project</RecommendedProjectHeading>
      <ProjectName>{project_name}</ProjectName>
      <SkillsContainer>
        {skills?.map((data) => {
          return <Skill key={data?.id}>{data?.skill_name}</Skill>;
        })}
      </SkillsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 335px;
  min-width: 335px;
  height: auto;
  border-radius: 30px;
  padding: 30px;
  background-color: ${white};
  text-align: left;
`;

const RecommendedProjectHeading = styled.span`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0%;
  color: ${black};
`;

const ProjectName = styled.div`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0%;
  margin-top: ${gap + 2}px;
  color: ${black};
`;

const SkillsContainer = styled.div`
  display: flex;
  gap: ${gap}px;
  margin-top: ${gap + 2}px;
`;

const Skill = styled.div`
  background-color: ${green};
  color: ${white};
  width: auto;
  height: auto;
  border-radius: 100px;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 8px;
  line-height: 9.6px;
  letter-spacing: 0%;
`;
