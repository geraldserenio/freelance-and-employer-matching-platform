import React from "react";
import styled from "styled-components";
import { WhiteStyledPaper } from "../../../../shared/containers/dashboard";
import { ExternalLink } from "lucide-react";
import { CardChipset } from "../../../../shared/chipset/CardChipset";
import { priceFormatter } from "../../../../../helper/priceFormatter";

export const FreelanceDashRecommended = ({ dashRecommendedData }) => {
  return (
    <StyledContainer>
      <Header>
        <div>Recommended Project</div>
        <ExternalLink color="#118AB2" style={{ cursor: "pointer" }} />
      </Header>
      <ProjectTitle>{dashRecommendedData?.project_name}</ProjectTitle>
      <SkillContainer>
        {dashRecommendedData?.requiredSkills?.map((chipset, index) => (
          <CardChipset key={index} chipsetvalue={chipset} />
        ))}
      </SkillContainer>
      <Divider />
      <InfoContainer>
        <div>
          Project Name: {dashRecommendedData?.project_reviews?.project_name}
        </div>
        <div>
          Payment Terms:{" "}
          {dashRecommendedData?.project_reviews?.payment_conditions}
        </div>
        <div>Timeline: {dashRecommendedData?.project_reviews?.timeline}</div>
      </InfoContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(WhiteStyledPaper)`
  flex: 1.2;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 3%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProjectTitle = styled.div`
  font-size: 30px;
`;

const SkillContainer = styled.div`
  display: flex;
  gap: 1%;
`;

export const Divider = styled.div`
  border: 1px solid #99aebb;
  margin: 1em 0em;
`;

const InfoContainer = styled.div`
  font-size: 18px;
  line-height: 27px;
  display: flex;
  flex-direction: column;
  gap: 1.3em;
`;
