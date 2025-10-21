import React from "react";
import styled from "styled-components";
import RecentProjectItem from "./RecentProjectItem";

export const RecentProjects = ({ recentProjectData }) => {
  return (
    <Container>
      <Title>Recent Projects</Title>
      <ProjectList>
        {recentProjectData?.map((project, index) => (
          <RecentProjectItem
            key={index}
            progress={project?.progress}
            status={project?.status}
            value={project?.value}
            projectName={project?.projectName}
            isLastItem={index === recentProjectData?.length - 1} // Pass if it's the last item
          />
        ))}
      </ProjectList>
    </Container>
  );
};

export default RecentProjects;

const Container = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Title = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;

const ProjectList = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
