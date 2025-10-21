import React from "react";
import styled from "styled-components";
import { DashHeadingImage } from "./DashHeadingImage";
import { DashWelcomeText } from "./DashWelcomeText";
import { generateIcon, Icon } from "../../icons/generate-icon";

export const DashboardHeading = ({ userName, headingText, imageSrc }) => {
  return (
    <DashboardHeadingContainer style={{ height: "30rem" }}>
      <DashWelcomeText headingText={headingText} userName={userName} />
      <Icon
        style={{ height: "100%", width: "50%", margin: "auto" }}
        src={generateIcon("BusinessDashboard")}
      />
    </DashboardHeadingContainer>
  );
};

const DashboardHeadingContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
