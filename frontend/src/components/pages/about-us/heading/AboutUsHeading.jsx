import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const AboutUsHeading = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Subtitle>
        Empowering Talent. Connecting Businesses. Shaping the Future.
      </Subtitle>
    </Container>
  );
};

export default AboutUsHeading;

const Container = styled.div`
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
  margin-top: 2em;
`;

const Title = styled.div`
  color: #118ab2;
  font-size: 1.5em;
`;

const Subtitle = styled.div`
  font-size: 60px;
`;
