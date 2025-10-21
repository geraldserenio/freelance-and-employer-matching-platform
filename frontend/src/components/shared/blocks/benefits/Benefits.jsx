import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { desktopDevice, largeScreens, tabletDevice } from "../../styles/sizes";
import { useNavigate } from "react-router-dom";

export const Benefits = (props) => {
  const { title } = props;
  const navigate = useNavigate();
  return (
    <Container>
      <BenefitsLabel onClick={() => navigate("/workshop")}>
        {title}
      </BenefitsLabel>
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    width: 33%;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    width: 33%;
  }
`;

const BenefitsLabel = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 40px;
  margin-top: 0;
  margin-bottom: 0;
  cursor: pointer;
`;
