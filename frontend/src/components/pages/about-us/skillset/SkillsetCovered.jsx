import React from "react";
import { OpportunitiesContainer } from "../../homepage/multiple-oppotunities-section/MultipleOpportunities";
import { OpportunitiesCard } from "../../../shared/blocks/multiple-opportunities/OpportunitiesCard";
import { Search } from "lucide-react";
import { TestimonialIcon } from "../../../shared/sections/reviews/Reviews";
import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const SkillsetCovered = ({ multipleOpportunities }) => {
  return (
    <Container>
      <TestimonialIcon>
        <Search />
        <div>Every skillset covered</div>
      </TestimonialIcon>
      <OpportunitiesContainer>
        {multipleOpportunities?.map((data) => {
          return (
            <OpportunitiesCard
              title={data?.title}
              icon={data?.icon}
              key={data?.title}
            />
          );
        })}
      </OpportunitiesContainer>
    </Container>
  );
};

export default SkillsetCovered;

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
`;
