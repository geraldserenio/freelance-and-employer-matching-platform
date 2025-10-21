import styled from "styled-components";
import { workShopBenefitsImage } from "../../../../assets/images/Workshop1.jpg";
import BenefitItem from "./BenefitItem";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { getWorkShopBenefits } from "../../../../services/workshop-benefits/workshop-benefits-services";
import { useEffect, useState } from "react";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { Heading2 } from "../../homepage/first-section/FirstSection";

const WorkshopBenefits = () => {
  const [workshopBenefits, setWorkshopbenefits] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getWorkShopBenefits();
      setWorkshopbenefits(result?.data?.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <ImageContainer>
        <Image src={generateIcon("Workshop3")} />
      </ImageContainer>
      <BenefitsContainer>
        <Title>What Makes Our Workshops Different?</Title>
        {workshopBenefits.map((item, index) => (
          <BenefitItem
            key={index}
            heading={item?.title}
            description={item?.description}
          />
        ))}
      </BenefitsContainer>
    </Container>
  );
};

export default WorkshopBenefits;

// Styled Components
const Container = styled.div`
  display: flex;
  gap: 2em;
  flex-direction: column;

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

const ImageContainer = styled.div`
  flex: 1;
  border-radius: 30px;
  overflow: hidden;
  align-items: stretch;
  height: 35rem; /* Keep the image height consistent */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BenefitsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3em;

  @media (min-width: ${tabletDevice}px) {
    gap: 2em;
  }

  @media (min-width: ${desktopDevice}px) {
    gap: 3em;
  }

  @media (min-width: ${largeScreens}px) {
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0;
  @media (min-width: ${tabletDevice}px) {
  }

  @media (min-width: ${desktopDevice}px) {
    font-size: 2rem;
  }

  @media (min-width: ${largeScreens}px) {
  }
`;
