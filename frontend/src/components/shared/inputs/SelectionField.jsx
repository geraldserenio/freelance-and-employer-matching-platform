import React from "react";
import styled from "styled-components";
import { useField } from "formik";
import { ErrorText } from "./ErrorText";
import { ChevronDown } from "lucide-react";

const SelectionField = ({ id, name, label, options = [], width = "100%" }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <SelectWrapper width={width}>
      <DropdownContainer>
        <StyledSelect
          {...field}
          id={id}
          name={name}
          onChange={(e) => helpers.setValue(e.target.value)}
        >
          <option value="">Select</option>{" "}
          {/* Ensuring empty string as default */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <Label htmlFor={id}>{label}</Label>
        <DropdownIcon />
      </DropdownContainer>
      {meta?.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
    </SelectWrapper>
  );
};

export default SelectionField;

const SelectWrapper = styled.div`
  width: ${(props) => props.width || "100%"};
  display: flex;
  flex-direction: column;
  gap: 10px; /* Increased gap to push dropdown lower */
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%; /* Moves dropdown lower */
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #aaa; /* Gray color */
  background: #fcfcfc;
  padding: 0 5px;
  transition: all 0.3s ease;
  pointer-events: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 18px 12px 10px; /* Adjusted padding for better spacing */
  border: 1px solid #99aebb;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  background: #fcfcfc;
  appearance: none;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: black;
  }

  &:focus + ${Label}, &:not([value=""]) + ${Label} {
    top: 4px;
    font-size: 10px;
    color: gray; /* Keep it gray */
  }
`;

const DropdownIcon = styled(ChevronDown)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 20px;
`;
