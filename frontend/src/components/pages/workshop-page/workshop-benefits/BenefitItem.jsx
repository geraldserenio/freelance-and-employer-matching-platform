import styled from "styled-components";
import {
  desktopDevice,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const BenefitItem = ({ heading, description }) => {
  return (
    <BenefitContainer>
      <Title>{heading}</Title>
      <Description>{description}</Description>
    </BenefitContainer>
  );
};

export default BenefitItem;

// Styled Components
const BenefitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const Title = styled.div`
  font-size: 1rem;
  @media (min-width: ${tabletDevice}px) {
  }

  @media (min-width: ${desktopDevice}px) {
    font-size: 2rem;
  }

  @media (min-width: ${largeScreens}px) {
  }
`;

const Description = styled.div`
  font-size: 0.8rem;

  @media (min-width: ${tabletDevice}px) {
  }

  @media (min-width: ${desktopDevice}px) {
    font-size: 1.5rem;
  }

  @media (min-width: ${largeScreens}px) {
  }
`;
