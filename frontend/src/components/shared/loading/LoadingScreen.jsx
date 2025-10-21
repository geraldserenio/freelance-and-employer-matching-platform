import React from "react";
import styled, { keyframes } from "styled-components";
import { primaryColor } from "../styles/color";

// Animation for rotating the circle
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Wrapper to center the loader
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

// Styled circle (spinner)
export const Spinner = styled.div`
  border: 8px solid #e0e0e0;
  border-top: 8px solid ${primaryColor};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

export const ButtonSpinner = styled.div`
  border: 8px solid #e0e0e0;
  border-top: 8px solid ${primaryColor};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingScreen = ({ styles }) => {
  return (
    <Wrapper style={styles}>
      <Spinner />
    </Wrapper>
  );
};

export default LoadingScreen;
