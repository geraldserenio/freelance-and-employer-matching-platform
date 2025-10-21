import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { black, primaryColor, white } from "../../styles/color";
import { desktopDevice, largeScreens, tabletDevice } from "../../styles/sizes";
import { useNavigate } from "react-router-dom";

export const SignUpAsSection = (props) => {
  const { btnText } = props;
  const navigate = useNavigate();
  return (
    <Container>
      <Heading>
        Liber is your gateway to flexible and rewarding freelance opportunities.
      </Heading>
      <SubHeading>
        Whether you’re a developer, designer, writer, consultant, or expert in
        any field, we connect you with verified businesses looking for your
        skills. Work on projects that match your expertise, set your own
        schedule, and get paid securely—all in one place.
      </SubHeading>
      <SignUpButton onClick={() => navigate("/sign-up")}>
        {btnText}
      </SignUpButton>
    </Container>
  );
};

const Heading = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 0%;
  color: ${black};
`;

const SubHeading = styled.h2`
  font-family: Poppins;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: ${black};
`;

const SignUpButton = styled.button`
  width: 339px;
  height: 65px;
  gap: 10px;
  border-radius: 100px;
  border-width: 1px;
  padding-top: 18px;
  padding-right: 30px;
  padding-bottom: 18px;
  padding-left: 30px;
  border: 1px solid ${primaryColor};
  background-color: ${white};
  color: ${primaryColor};
  cursor: pointer;
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 24px;
  line-height: 28.8px;
  letter-spacing: 0%;
  margin-top: 12px;
`;

const Container = styled.div`
  text-align: left;
  padding: 38px;

  @media (min-width: ${tabletDevice}px) {
    text-align: left;
    padding: 38px;
  }

  @media (min-width: ${desktopDevice}px) {
    text-align: left;
    padding: 38px;
    width: 60%;
  }

  @media (min-width: ${largeScreens}px) {
    text-align: left;
    padding: 38px;
    width: 60%;
  }
`;
