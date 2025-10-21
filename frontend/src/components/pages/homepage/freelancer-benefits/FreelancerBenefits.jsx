import React from "react";
import styled from "styled-components";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { SubHeadingSection } from "../../../shared/generic/headers";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { Benefits } from "../../../shared/blocks/benefits/Benefits";
import { Heading2 } from "../first-section/FirstSection";

export const FreelancerBenefits = ({ freelancerBenefits, heading }) => {
  return (
    <Container>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Gift")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection>{heading}</SubHeadingSection>
      </SubHeadingAndIconContainer>
      <BenefitsContainer>
        {heading === "Freelancer benefits" ? (
          freelancerBenefits?.map((data, index) => {
            return <Benefits title={data?.title} key={index} />;
          })
        ) : (
          <div>
            <Heading2 style={{ fontWeight: "bold" }}>
              Building the Future, One Classroom at a Time
            </Heading2>
            <Heading2>{freelancerBenefits[0].title}</Heading2>
            <Heading2 style={{ marginTop: gap + 5 }}>
              Ready to bring future-focused learning to your students?
            </Heading2>
            <Heading2 style={{ fontWeight: "bold" }}>
              Partner with us or bring Liber to your school.
            </Heading2>
          </div>
        )}
      </BenefitsContainer>
    </Container>
  );
};

const Container = styled.div`
  text-align: start;
  margin-top: 103px;
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
    margin-top: 0;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
    margin-top: 0;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
    margin-top: 0;
  }
`;

const SubHeadingAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

const BenefitsContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${gap * 5}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto;
    gap: ${gap * 5}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;
