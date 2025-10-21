import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { workShopHeadingImage } from "../../../../assets/s3Assets";
import UniversityLogos from "./UniversityLogos";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { getPartneredUniversities } from "../../../../services/partnered universities/partnered-universities";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";

const WorkshopHeadingSection = () => {
  const [partneredUniversities, setPartneredUniversities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getPartneredUniversities({ page: 1, limit: 5 });
      setPartneredUniversities(result?.data?.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <LeftSection>
        <Heading>Shaping Future Innovators Through Real-World Learning</Heading>
        <SubHeading>Partnered with institutions:</SubHeading>
        <LogosContainer>
          <Icon
            src={generateIcon("UnitedArabEmiratesMinistryOfEconomy")}
            style={{ width: "270px", height: "80px" }}
          />
          <Icon
            src={generateIcon("NationalCharitySchool")}
            style={{ width: "250px", height: "280px" }}
          />
        </LogosContainer>
      </LeftSection>

      <RightSection>
        <Image src={generateIcon("Workshop4")} />
      </RightSection>
    </Container>
  );
};

export default WorkshopHeadingSection;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column; /* Default: column for smaller screens */
  margin-top: 3%;
  align-items: stretch;
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

const LeftSection = styled.div`
  flex: 1.1;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  font-size: 40px;
  line-height: 60px;

  @media (min-width: ${tabletDevice}px) {
    font-size: 50px;
    line-height: 80px;
  }

  @media (min-width: ${desktopDevice}px) {
    font-size: 72px;
    line-height: 108px;
  }

  @media (min-width: ${largeScreens}px) {
    font-size: 72px;
    line-height: 108px;
  }
`;

const SubHeading = styled.div`
  font-size: 1.5em;
`;

const LogosContainer = styled.div`
  display: block;
  margin-top: 1em;
  gap: 1%;

  @media (min-width: ${tabletDevice}px) {
    display: block;
    margin-top: 1em;
    gap: 1%;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    margin-top: 1em;
    gap: 1%;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    margin-top: 1em;
    gap: 1%;
  }
`;

const RightSection = styled.div`
  flex: 0.9;
  display: flex;
  overflow: hidden;
  align-items: stretch;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  height: 28rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
