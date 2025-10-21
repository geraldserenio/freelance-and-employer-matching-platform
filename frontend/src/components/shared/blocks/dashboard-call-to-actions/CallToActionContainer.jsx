import React from "react";
import styled from "styled-components";
import DashboardCallToActions from "./DashboardCallToActions";

const callToActionList = [
  {
    title: "Create a new project",
    buttonValue: "Post a project",
    link: "/projects",
  },
  {
    title: "Browse freelancers",
    buttonValue: "Start a hire",
    link: "/",
  },
  {
    title: "Create a new job listing",
    buttonValue: "Post a job",
    link: "/jobs",
  },
];

const CallToActionContainer = () => {
  return (
    <Container>
      {callToActionList.map((item, index) => (
        <DashboardCallToActions
          key={index}
          title={item.title}
          buttonValue={item.buttonValue}
          isFirst={index === 0}
          link={item.link}
        />
      ))}
    </Container>
  );
};

export default CallToActionContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
