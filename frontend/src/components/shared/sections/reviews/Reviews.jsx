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
import { SubHeading } from "../../../shared/generic/headers";
import { TestimonialCard } from "../../../shared/blocks/testimonials/TestimonialCard";
import { secondaryBlueColor } from "../../styles/color";
import { useLocation } from "react-router-dom";
import { Users } from "lucide-react";

export const Reviews = (props) => {
  const { heading, testimonials } = props;

  const location = useLocation();

  return (
    <Container>
      <SubHeadingAndIconContainer>
        <SubHeading>{heading}</SubHeading>
      </SubHeadingAndIconContainer>
      {location?.pathname === "/about-us" && (
        <TestimonialIcon>
          <Users />
          <div>Testimonials</div>
        </TestimonialIcon>
      )}
      <TestimonialContainer>
        {testimonials?.map((data, index) => {
          return (
            <TestimonialCard
              key={index}
              backgroundColor={secondaryBlueColor}
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
  margin-top: 103px;
  text-align: start;
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

export const TestimonialIcon = styled.div`
  color: #118ab2;
  display: flex;
  gap: 1em;
  // margin-left: 1em;
  font-size: 1.5em;
  align-items: center;
  margin-bottom: 1em;
`;

const SubHeadingAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  padding: ${gap}px;
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
