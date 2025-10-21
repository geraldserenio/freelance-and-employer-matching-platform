import React from "react";
import styled from "styled-components";

export const DashWelcomeText = ({ userName, headingText }) => {
  return (
    <DashWelcomeContainer>
      <WelcomeText>Welcome, {userName}</WelcomeText>
      <MainHeading> {headingText}</MainHeading>
    </DashWelcomeContainer>
  );
};

const DashWelcomeContainer = styled.div`
  padding-left: 2em;
  flex: 1;
`;

const WelcomeText = styled.p`
  color: #99aebb;
  font-size: 2rem;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0%;
  margin: 0;
  margin-bottom: 1em;
`;

const MainHeading = styled.p`
  font-size: 80px;
  font-weight: 400;
  line-height: 102px;
  letter-spacing: 0%;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 60px; /* Slightly smaller for medium screens */
    line-height: 80px;
  }

  @media (max-width: 768px) {
    font-size: 40px; /* Reduce further for tablets */
    line-height: 50px;
  }

  @media (max-width: 480px) {
    font-size: 32px; /* Even smaller for mobile */
    line-height: 40px;
  }
`;
