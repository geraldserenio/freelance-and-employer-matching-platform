import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { generateIcon, Icon } from "../../icons/generate-icon";
import { primaryDarkColor } from "../../styles/color";

export const Perks = (props) => {
  const { heading, subHeading, icon } = props;
  return (
    <Container>
      <Icon
        src={generateIcon(icon)}
        style={{ width: "24px", height: "24px" }}
      />
      <Heading
        style={{ color: icon === "CheckBlue" ? primaryDarkColor : "#F7F7F7" }}
      >
        {heading}
      </Heading>
      <SubHeading
        style={{ color: icon === "CheckBlue" ? primaryDarkColor : "#F7F7F7" }}
      >
        {subHeading}
      </SubHeading>
    </Container>
  );
};

const Container = styled.div`
  height: auto;
  border-radius: 20px;
  gap: 10px;
  padding: 30px;
  text-align: start;
`;

const Heading = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: ${primaryDarkColor};
`;

const SubHeading = styled.h2`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  color: ${primaryDarkColor};
`;
