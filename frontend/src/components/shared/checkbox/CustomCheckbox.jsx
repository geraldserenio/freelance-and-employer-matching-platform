import React from "react";
import { useFormikContext } from "formik";
import styled from "styled-components";

const CustomCheckbox = ({ name, label }) => {
  const { setFieldValue, values } = useFormikContext();
  const isChecked = values[name] || false; // Default to false

  const handleChange = () => {
    setFieldValue(name, !isChecked); // Toggle between true/false
  };

  return (
    <Label>
      <HiddenCheckbox
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <CustomBox checked={isChecked} />
      {label}
    </Label>
  );
};

export default CustomCheckbox;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  cursor: pointer;
  color: #99aebb;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomBox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px; /* Softer edges */
  border: 1px solid #99aebb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => (props.checked ? "#007bff" : "transparent")};
  position: relative;

  &::after {
    content: "✔";
    display: ${(props) => (props.checked ? "block" : "none")};
    font-size: 16px;
    color: white;
  }
`;
