import styled from "styled-components";
import { CircleCheck } from "lucide-react";
import { generateIcon } from "../../../shared/icons/generate-icon";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

// Component
const OurImpact = () => {
  const impacts = [
    {
      count: "100+ Freelancers",
      description:
        "Skilled professionals across design, development, AI, and more — using Liber to find opportunities and grow their careers.",
    },
    {
      count: "46 Businesses",
      description:
        "Trusted by startups, agencies, and organisations across the UAE to find and hire top freelance talent.",
    },
    {
      count: "10+ School Partners",
      description:
        "Collaborating with schools to deliver hands-on workshops that equip students with real-world skills for the future.",
    },
  ];

  return (
    <Container>
      <Content>
        <Title>Our Impact</Title>
        {impacts.map((impact, index) => (
          <ImpactItem key={index}>
            <CircleCheck color="#118AB2" />
            <ImpactCount>{impact.count}</ImpactCount>
            <div>{impact.description}</div>
          </ImpactItem>
        ))}
      </Content>

      <ImageContainer>
        <Testimonial>
          “Thanks to Liber, I’ve been able to grow my skills, expand my network,
          and take my freelance business to new heights.”
        </Testimonial>

        <ConferenceIcon src={generateIcon("Conference")} />
        <EarningsIcon src={generateIcon("Earnings")} />
      </ImageContainer>
    </Container>
  );
};

export default OurImpact;

// Styled Components
const Container = styled.div`
  background-color: #f3f5fd;
  border-radius: 60px;
  display: flex;
  padding: 3em;
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

const Content = styled.div`
  flex: 1.1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 3em;
`;

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 1em;
`;

const ImpactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ImpactCount = styled.div`
  font-size: 1.5em;
`;

const ImageContainer = styled.div`
  flex: 0.9;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  @media (min-width: ${tabletDevice}px) {
    display: none;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;

const Testimonial = styled.div`
  color: white;
  border-radius: 30px;
  background-color: #1d1e2b;
  padding: 1em;
  width: 353px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`;

const Icon = styled.img`
  position: absolute;
`;

const ConferenceIcon = styled(Icon)`
  z-index: 1;
`;

const EarningsIcon = styled(Icon)`
  bottom: 0;
  left: 0;
  z-index: 0;
`;
