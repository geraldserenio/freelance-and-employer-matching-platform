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
const CONCTRACT_TYPES_OPTION = [
  { value: "Contractual", text: "Contractual" },
  { value: "Full-time", text: "Full-time" },
  { value: "Part-time", text: "Part-time" },
  { value: "Freelance", text: "Freelance" },
  { value: "Project", text: "Project" },
];

const EXPERIENCE_LEVEL_OPTION = [
  { value: "Entry Level", text: "Entry Level" },
  { value: "Junior Level", text: "Junior Level" },
  { value: "Mid Level", text: "Mid level" },
  { value: "Senior Level", text: "Senior Level" },
  { value: "Lead", text: "Lead" },
  { value: "Managerial", text: "Managerial" },
];

const LOCATION = [
  { value: "Remote", text: "Remote" },
  { value: "Dubai", text: "Dubai" },
  { value: "US", text: "US" },
  { value: "Canada", text: "Canada" },
  { value: "Philippines", text: "Philippines" },
  { value: "Japan", text: "Japan" },
  { value: "Europe", text: "Europe" },
];

const SALARY_RANGE = [
  { value: "$100 - $400 ", text: "$100 - $400" },
  { value: "$500 - $1000", text: "$500 - $1000" },
  { value: "$1000 - $2000", text: "$1000 - $2000" },
  { value: "$3000 - $4000", text: "$3000 - $4000" },
  { value: "$4000 - $5000", text: "$4000 - $5000" },
  { value: "$5000 - $6000", text: "$5000 - $6000" },
  { value: "$6000 - $7000", text: "$6000 - $7000" },
];

export const Panel = ({
  keywords,
  contractFilters,
  experienceLevelFilters,
  handleApplyFilters,
  salaryFilters,
  locationFilters,
  setContractFilters,
  setExperienceLevelFilters,
  setLocationFilters,
  setSalaryFilters,
}) => {
  const handleContractFilters = async (selectedOption) => {
    setContractFilters(selectedOption);
  };

  const handleExperienceLevelFilters = async (selectedOption) => {
    setExperienceLevelFilters(selectedOption);
  };

  const handleLocationFilters = async (selectedOption) => {
    setLocationFilters(selectedOption);
  };

  const handleSalaryFilters = async (selectedOption) => {
    setSalaryFilters(selectedOption);
  };

  const handleFilters = () => {
    const filters = {
      contract_type: contractFilters,
      experience_level: experienceLevelFilters,
      salary: salaryFilters,
      location: locationFilters,
      job_title: keywords ? [keywords] : [],
    };
    handleApplyFilters(filters);
  };

  return (
    <MainContaier>
      <DropdownContainer>
        <DropdownPrimary
          selectedValues={contractFilters}
          options={CONCTRACT_TYPES_OPTION}
          placeholder="Conctract type"
          onSelect={handleContractFilters}
        />

        <DropdownPrimary
          selectedValues={experienceLevelFilters}
          options={EXPERIENCE_LEVEL_OPTION}
          placeholder="Experience Level"
          onSelect={handleExperienceLevelFilters}
        />

        <DropdownPrimary
          selectedValues={salaryFilters}
          options={SALARY_RANGE}
          placeholder="Salary range"
          onSelect={handleSalaryFilters}
        />

        <DropdownPrimary
          selectedValues={locationFilters}
          options={LOCATION}
          placeholder="Location"
          onSelect={handleLocationFilters}
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
