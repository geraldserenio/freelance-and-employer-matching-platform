import React from "react";
import styled from "styled-components";
import JobHeaderInput from "./JobHeaderInput";
import { fontFamily } from "../../../shared/styles/theme";
import { primaryDarkColor, white } from "../../../shared/styles/color";

export const JobHeader = ({
  heading,
  subHeading,
  value,
  onChange,
  setFetchFlag,
  fetchFlag,
  setJobListingList,
}) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <SubHeading>{subHeading}</SubHeading>
      <JobHeaderInput
        value={value}
        onChange={onChange}
        setFetchFlag={setFetchFlag}
        fetchFlag={fetchFlag}
        setJobListingList={setJobListingList}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${primaryDarkColor};
  text-align: start;
  padding: 72px;
  padding-top: 52px;
  padding-bottom: 42px;
  border-radius: 0px 0px 40px 40px;
  margin-bottom: 20px;
`;

const Heading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 72px;
  line-height: 86.4px;
  color: ${white};
  margin-top: 0;
`;

const SubHeading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 42px;
  line-height: 50.4px;
  color: ${white};
`;
