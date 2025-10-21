import React from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

const CustomCheckboxRadio = ({ name, value, label }) => {
  const { setFieldValue, values } = useFormikContext();
  const isChecked = values[name] === value; // Only one value allowed

  const handleChange = () => {
    setFieldValue(name, isChecked ? "" : value); // Toggle role selection
  };

  return (
    <Label>
      <HiddenRadio
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <CustomRadio checked={isChecked} />
      {label}
    </Label>
  );
};

export default CustomCheckboxRadio;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

const HiddenRadio = styled.input`
  display: none;
`;

const CustomRadio = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid #99aebb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => (props.checked ? "#007bff" : "transparent")};
  position: relative;

  &::after {
    content: "";
    display: ${(props) => (props.checked ? "block" : "none")};
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 4px; /* Rounded edges for a soft square look */
  }
`;
