import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { generateIcon, Icon } from "../../icons/generate-icon";
import { desktopDevice, largeScreens, tabletDevice } from "../../styles/sizes";

export const OpportunitiesCard = (props) => {
  const { icon, title, styles, textStyles, iconStyles } = props;
  return (
    <Container style={styles || {}}>
      <div>
        <Icon
          src={generateIcon(icon)}
          style={iconStyles || { width: "68.75px", height: "68.75px" }}
        />
        <Title style={textStyles || {}}>{title}</Title>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #eff7fa;
  height: 210px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (min-width: ${tabletDevice}px) {
    background-color: #eff7fa;
    height: 210px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  @media (min-width: ${desktopDevice}px) {
    background-color: #eff7fa;
    height: 210px;
    width: 16.66666666666667%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  @media (min-width: ${largeScreens}px) {
    background-color: #eff7fa;
    height: 210px;
    width: 16.66666666666667%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const Title = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  color: #118ab2;
  margin-top: 0;
`;
