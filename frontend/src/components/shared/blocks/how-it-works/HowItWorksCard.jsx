import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { generateIcon, Icon } from "../../icons/generate-icon";
import { gray, primaryDarkColor } from "../../styles/color";

export const HowItWorksCard = (props) => {
  const { heading, subHeading, icon } = props;
  return (
    <Container>
      <Icon
        src={generateIcon(icon)}
        style={{ width: "64px", height: "64px" }}
      />
      <Heading>{heading}</Heading>
      <SubHeading>{subHeading}</SubHeading>
    </Container>
  );
};

const Container = styled.div`
  height: 245;
  border-radius: 20px;
  gap: 10px;
  padding: 30px;
  border: 1px solid ${gray};
  text-align: start;
`;

const Heading = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  letter-spacing: 0%;
  color: ${primaryDarkColor};
`;

const SubHeading = styled.h2`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: ${primaryDarkColor};
`;
