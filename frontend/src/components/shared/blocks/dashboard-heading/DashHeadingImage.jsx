import React from "react";
import styled from "styled-components";

export const DashHeadingImage = ({ imageSrc }) => {
  return (
    <HeadingImageContainer>
      <StyledImage src={imageSrc} alt="heading image" />
    </HeadingImageContainer>
  );
};

const HeadingImageContainer = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 30px 30px 0 0;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
