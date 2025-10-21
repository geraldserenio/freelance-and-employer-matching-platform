import styled from "styled-components";
import { generateIcon } from "../../../shared/icons/generate-icon";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const AboutUsImagesSection = () => {
  return (
    <Container>
      <LeftImageContainer>
        <StyledImage
          src={generateIcon("Homepage1")}
          alt="About Us Left"
          style={{ height: "100%", width: "100%", borderRadius: "24px" }}
        />
      </LeftImageContainer>

      <RightImageContainer>
        <ImageRow>
          <SmallImageContainer>
            <FullHeightImage src={generateIcon("Library")} alt="Library" />
          </SmallImageContainer>
          <LargeImageContainer>
            <FullHeightImage
              style={{ width: "100%", borderRadius: "24px" }}
              src={generateIcon("ForFreelancerTabWhyChooseLiber")}
              alt="Laptop Meeting"
            />
          </LargeImageContainer>
        </ImageRow>

        <ImageRow>
          <LargeImageContainer>
            <FullHeightImage
              src={generateIcon("PlantMeeting")}
              alt="Plant Meeting"
            />
          </LargeImageContainer>
          <SmallImageContainer>
            <FullHeightImage
              src={generateIcon("TwoPersonMeeting")}
              alt="Two Person Meeting"
            />
          </SmallImageContainer>
        </ImageRow>
      </RightImageContainer>
    </Container>
  );
};

export default AboutUsImagesSection;

// Styled Components
const Container = styled.div`
  margin-top: 5em;
  display: flex;
  flex-direction: column;

  margin: ${deviceMargin.mobile}px;
  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
    display: flex;
    flex-direction: row;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
    display: flex;
    flex-direction: row;
  }
`;

const LeftImageContainer = styled.div`
  flex: 1;
  margin-right: ${gap}px;
`;

const RightImageContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ImageRow = styled.div`
  flex: 1;
  display: flex;
  gap: ${gap * 2}px;
  flex-direction: column;
  @media (min-width: ${tabletDevice}px) {
    flex-direction: column;
  }

  @media (min-width: ${desktopDevice}px) {
    flex-direction: row;
  }

  @media (min-width: ${largeScreens}px) {
    flex-direction: row;
  }
`;

const SmallImageContainer = styled.div`
  flex: 1;
`;

const LargeImageContainer = styled.div`
  display: none;
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

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const FullHeightImage = styled.img`
  height: 100%;
  width: auto;
`;
