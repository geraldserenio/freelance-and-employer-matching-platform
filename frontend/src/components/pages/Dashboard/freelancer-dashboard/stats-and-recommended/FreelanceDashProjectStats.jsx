import React from "react";
import styled from "styled-components";
import { formatKey } from "../../../../../utils/textFormatter";

export const FreelanceDashProjectStats = ({ projectStats }) => {
  return (
    <StatsContainer style={{ flex: 0.8 }}>
      <ProjectTitle>Project Stats</ProjectTitle>
      <StatsList>
        {projectStats?.map((stat, index) => (
          <StatItem key={index}>
            <ColorDot color={stat.color} />
            <StatText>
              {stat?.value} {formatKey(stat?.name)}
            </StatText>
          </StatItem>
        ))}
      </StatsList>
    </StatsContainer>
  );
};

// Styled components
const StatsContainer = styled.div`
  padding: 0.5em 1em;
  padding-bottom: 1em;
  background-color: #1d1e2b;
  border-radius: 30px;
  color: #ffffff;
  text-align: left;
`;

const ProjectTitle = styled.p`
  font-size: 15px;
  margin-bottom: 0.5em;
`;

const StatsList = styled.div`
  padding-top: 0.5em;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #99aebb;
  gap: 8px;
  margin-bottom: 1em;
  padding-top: 1em;
`;

const ColorDot = styled.span`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`;

const StatText = styled.span`
  font-size: 30px;
`;
