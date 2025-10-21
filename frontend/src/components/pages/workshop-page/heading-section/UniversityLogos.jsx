import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";

const UniversityLogos = ({ logoUrl }) => {
  return (
    <LogoContainer>
      {logoUrl ? <Icon src={generateIcon("Empty")} /> : "LOGO"}
    </LogoContainer>
  );
};

export default UniversityLogos;

const LogoContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 12px;
  width: 100px;
  height: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
