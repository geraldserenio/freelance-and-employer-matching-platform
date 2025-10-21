import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const AboutUsMidDescription = () => {
  return (
    <Container>
      <MainText>
        Liber empowers freelancers to showcase their skills, businesses to find
        top talent and students to prepare for the future.
      </MainText>
      <SubText>
        With features like Liber Learn for skill enhancement and Liber Workshops
        for schools and universities, we bridge the gap between education and
        the real world, focusing on practical skills like app development,
        financial literacy, AI, and social media mastery.
      </SubText>
    </Container>
  );
};

export default AboutUsMidDescription;

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  text-align: left;
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

const MainText = styled.div`
  font-size: 2em;
`;

const SubText = styled.div`
  font-size: 1.5em;
`;
