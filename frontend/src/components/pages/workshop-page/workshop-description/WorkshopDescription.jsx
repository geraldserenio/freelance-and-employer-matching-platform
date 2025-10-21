import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const WorkshopDescription = () => {
  return (
    <Container>
      <Heading>
        We’re not just running workshops. We’re redesigning education to align
        with the future. Our programs give students the skills they need to
        thrive today and lead tomorrow.
      </Heading>
      <Paragraph>
        From app development and AI to financial literacy and personal branding,
        every session is built to prepare students for real-world challenges.
      </Paragraph>
      <Paragraph>
        We believe every student deserves the tools to create, lead, and solve
        problems. This is where that journey begins
      </Paragraph>
    </Container>
  );
};

export default WorkshopDescription;

// Styled Components
const Container = styled.div`
  text-align: left;

  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    flex-direction: column;
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    flex-direction: row;
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    flex-direction: row;
    margin: ${deviceMargin.largeScreen}px;
  }
`;

const Heading = styled.div`
  font-size: 20px;

  @media (min-width: ${tabletDevice}px) {
    font-size: 30px;
  }

  @media (min-width: ${desktopDevice}px) {
    font-size: 30px;
  }

  @media (min-width: ${largeScreens}px) {
  }
`;

const Paragraph = styled.div`
  font-size: 17px;

  @media (min-width: ${tabletDevice}px) {
    font-size: 1.5em;
  }

  @media (min-width: ${desktopDevice}px) {
    font-size: 1.5em;
  }

  @media (min-width: ${largeScreens}px) {
  }
`;
