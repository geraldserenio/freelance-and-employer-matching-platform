import styled from "styled-components";
import { SecondaryButtonStyle } from "../../../shared/button/buttonsStyles";
import { useNavigate } from "react-router-dom";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const Objective = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Section>
        <Title>Our Vision</Title>
        <Description>
          To lead the freelance marketplace with seamless experiences, secure
          payments, and quality assurance while empowering future generations.
        </Description>
      </Section>
      <Section>
        <Title>Our Mission</Title>
        <Description>
          To transform freelancing by fostering community, innovation, and
          opportunities for freelancers, businesses, and students.
        </Description>
      </Section>
      <StyledButton onClick={() => navigate("/sign-up")}>
        Join Liber
      </StyledButton>
    </Container>
  );
};

export default Objective;

const Container = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 55%;
  margin-top: 5em;
  margin: ${deviceMargin.mobile}px;
  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const Title = styled.div`
  font-size: 2em;
`;

const Description = styled.div`
  font-size: 1.5em;
`;

const StyledButton = styled.button`
  font-weight: 600;
  font-size: 1rem;
  display: flex; /* Ensures it only takes the width of its content */
  align-items: center;
  justify-content: center;
  color: #118ab2;
  background-color: #ffffff;
  border: 1px solid #118ab2;
  border-radius: 25px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  width: fit-content; /* Ensures it only takes the width of its content */

  &:hover {
    background-color: #118ab2;
    color: #ffffff;
  }
`;
