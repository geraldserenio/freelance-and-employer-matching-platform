import React from "react";
import styled from "styled-components";
import { fontFamily } from "../styles/theme";
import { primaryDarkColor, white } from "../styles/color";

export const FreelancerHeadingTitle = (props) => {
  const { title } = props;
  const { top, left, right, bottom } = props?.cssStyles || {};
  return (
    <Container style={{ top: top, left: left, right: right, bottom: bottom }}>
      {title}
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: 48px;
  border-radius: 20px;
  padding-top: 12px;
  padding-right: 20px;
  padding-bottom: 12px;
  padding-left: 20px;
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  position: absolute;
  background-color: ${white};
  color: ${primaryDarkColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
