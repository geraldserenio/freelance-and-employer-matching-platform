import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { primaryColor, white } from "../../../shared/styles/color";

const JobHeaderInput = ({
  value,
  onChange,
  setFetchFlag,
  fetchFlag,
  setJobListingList,
}) => {
  return (
    <TextboxContainer>
      <Icon />
      <Input
        placeholder="Job title / Keywords"
        value={value}
        onChange={onChange}
      />
      <Button
        onClick={() => {
          setJobListingList([]);
          setFetchFlag(!fetchFlag);
        }}
      >
        Search
      </Button>
    </TextboxContainer>
  );
};

export default JobHeaderInput;

const TextboxContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 30px;
`;

const Icon = styled(FiSearch)`
  color: #888;
  font-size: 20px;
  margin-right: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
`;

const Button = styled.button`
  width: auto;
  height: auto;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  color: ${white};
  background-color: ${primaryColor};
  border: 0;
`;
