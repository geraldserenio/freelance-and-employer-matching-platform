import React, { useState } from "react";
import styled from "styled-components";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { ApplyButton, ButtonSection } from "../ApplicationPage";
import { BackToListingButton } from "../job-header/JobApplicationInfo";
import { secondaryBlueColor } from "../../../shared/styles/color";
import { DropdownPrimary } from "../../../shared/inputs/DropdownPrimary";

const EXPERIENCE_LEVEL_OPTION = [
  { value: "Entry Level", text: "Entry Level" },
  { value: "Junior Level", text: "Junior Level" },
  { value: "Mid Level", text: "Mid level" },
  { value: "Senior Level", text: "Senior Level" },
  { value: "Lead", text: "Lead" },
  { value: "Managerial", text: "Managerial" },
];

const SKILLS_OPTION = [
  { value: "PHP", text: "PHP" },
  { value: "React", text: "React" },
  { value: "Node", text: "Node" },
  { value: "Javascript", text: "Javascript" },
  { value: "Typescript", text: "Typescript" },
  { value: "Laravel", text: "Laravel" },
  { value: "Java", text: "Java" },
  { value: "Styled Component", text: "Styled Component" },
  { value: "SQL", text: "SQL" },
  { value: "MySQL", text: "MySQL" },
  { value: "Spring MVC", text: "Spring MVC" },
];

const YEARS_OF_EXPERIENCE = [
  { value: "1", text: "1 year" },
  { value: "2", text: "2 years" },
  { value: "3", text: "3 years" },
  { value: "4", text: "4 years" },
  { value: "5", text: "5 years" },
  { value: "6", text: "6 years" },
  { value: "7", text: "7 years" },
  { value: "8", text: "8 years" },
  { value: "9", text: "9 years" },
  { value: "10", text: "10 years" },
];

export const PanelForFreelancersPage = ({
  keywords,
  handleApplyFilters,
  experienceLevelFilters,
  yearsOfExperience,
  setExperienceLevelFilters,
  setYearsOfExperienceFilters,
}) => {
  const handleYOEFilters = async (selectedOption) => {
    setYearsOfExperienceFilters(selectedOption);
  };

  const handleExperienceLevelFilters = async (selectedOption) => {
    setExperienceLevelFilters(selectedOption);
  };

  const handleFilters = () => {
    const filters = {
      years_of_experience: yearsOfExperience,
      experience_level: experienceLevelFilters,
      first_name: keywords ? [keywords] : [],
    };
    handleApplyFilters(filters);
  };

  return (
    <MainContaier>
      <DropdownContainer>
        <DropdownPrimary
          selectedValues={experienceLevelFilters}
          options={EXPERIENCE_LEVEL_OPTION}
          placeholder="Experience Level"
          onSelect={handleExperienceLevelFilters}
        />

        <DropdownPrimary
          selectedValues={yearsOfExperience}
          options={SKILLS_OPTION}
          placeholder="Skills"
          onSelect={handleYOEFilters}
        />

        <DropdownPrimary
          selectedValues={yearsOfExperience}
          options={YEARS_OF_EXPERIENCE}
          placeholder="Years of experience"
          onSelect={handleYOEFilters}
        />
      </DropdownContainer>

      <ButtonSection style={{ paddingLeft: gap * 2 }}>
        <ApplyButton
          onClick={() => {
            handleFilters();
          }}
        >
          Apply filters
        </ApplyButton>
        <BackToListingButton style={{ marginTop: 0 }}>
          Reset filters
        </BackToListingButton>
      </ButtonSection>
    </MainContaier>
  );
};

const DropdownContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${gap * 2}px;
  padding: 20px;
  background-color: ${secondaryBlueColor};
  border-radius: 30px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: ${gap * 2}px;
    padding: 20px;
    background-color: ${secondaryBlueColor};
    border-radius: 30px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: ${gap * 2}px;
    padding: 20px;
    background-color: ${secondaryBlueColor};
    border-radius: 30px;
  }

  @media (min-width: ${largeScreens}px) {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: ${gap * 2}px;
    padding: 20px;
    background-color: ${secondaryBlueColor};
    border-radius: 30px;
  }
`;

const MainContaier = styled.div`
  background-color: ${secondaryBlueColor};
  display: grid;
  padding: 20px;
  border-radius: 30px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${gap * 2}px;
  padding: 20px;
  background-color: ${secondaryBlueColor};
  border-radius: 30px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: ${gap * 2}px;
    padding: 20px;
    background-color: ${secondaryBlueColor};
    border-radius: 30px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: ${gap * 2}px;
    padding: 20px;
    background-color: ${secondaryBlueColor};
    border-radius: 30px;
  }

  @media (min-width: ${largeScreens}px) {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: ${gap * 2}px;
    padding: 20px;
    background-color: ${secondaryBlueColor};
    border-radius: 30px;
  }
`;
