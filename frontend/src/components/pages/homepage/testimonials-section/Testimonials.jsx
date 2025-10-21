import React from "react";
import styled from "styled-components";
import {
  desktopDevice,
  largeScreens,
  margin,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { SubHeadingSection } from "../../../shared/generic/headers";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { TestimonialCard } from "../../../shared/blocks/testimonials/TestimonialCard";

export const Testimonials = ({ testimonials }) => {
  return (
    <Container>
      <SubHeadingAndIconContainer>
        <Icon
          src={generateIcon("Search")}
          style={{ height: "24px", width: "24px" }}
        />
        <SubHeadingSection>Testimonials</SubHeadingSection>
      </SubHeadingAndIconContainer>
      <TestimonialContainer>
        {testimonials?.map((data, index) => {
          return (
            <TestimonialCard
              key={index}
              name={`${data?.users?.first_name} ${data?.users?.last_name}`}
              jobTitle={data?.users?.job_title}
              testimony={data?.testimony}
            />
          );
        })}
      </TestimonialContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: ${margin}px;
  margin-top: 103px;
  text-align: start;
`;

const SubHeadingAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

export const TestimonialContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 10px;
  padding: 10px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
    padding: 10px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
  }

  @media (min-width: ${largeScreens}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    padding: 10px;
  }
`;
