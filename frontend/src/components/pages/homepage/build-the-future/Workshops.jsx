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
import { Heading2 } from "../first-section/FirstSection";
import { gray } from "../../../shared/styles/color";

export const Workshops = ({ testimonials }) => {
  return (
    <Container>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Users")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection>Workshops That Build the Future</SubHeadingSection>
      </SubHeadingAndIconContainer>
      <Container1>
        <TestimonialContainer>
          <Heading2 style={{ fontWeight: "bold" }}>
            Building the Future, One Classroom at a Time
          </Heading2>
          <Heading2>
            The next generation is already learning how to code apps, harness
            AI, master money, and build their digital brand. Liber Workshops are
            now live in schools across the UAE.
          </Heading2>
          <Heading2 style={{ marginTop: gap + 5 }}>
            Ready to bring future-focused learning to your students?
          </Heading2>
          <Heading2 style={{ fontWeight: "bold" }}>
            Partner with us or bring Liber to your school.
          </Heading2>
        </TestimonialContainer>
        <ImageRightContainer>
          <Icon
            style={{ width: "100%", height: "auto", borderRadius: "40px" }}
            src={generateIcon("Workshop2")}
          />
        </ImageRightContainer>
      </Container1>
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

const ImageRightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: ${tabletDevice}px) {
    width: 100%;
  }

  @media (min-width: ${desktopDevice}px) {
    width: 50%;
  }

  @media (min-width: ${largeScreens}px) {
    width: 50%;
  }
`;

const Container1 = styled.div`
  display: block;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: block;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;

const SubHeadingAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

export const TestimonialContainer = styled.div`
  display: block;
  gap: 10px;
  border: 1px solid ${gray};
  border-radius: 40px;
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    gap: 10px;
    padding: 2rem;
    width: 100%;
    margin-bottom: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    gap: 10px;
    padding: 3rem;
    width: 50%;
    margin-bottom: 0px;
  }

  @media (min-width: ${largeScreens}px) {
    gap: 10px;
    padding: 3rem;
    width: 50%;
    margin-bottom: 0px;
  }
`;
