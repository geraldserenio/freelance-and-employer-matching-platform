import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gray, primaryDarkColor } from "../styles/color";
import { generateIcon } from "../icons/generate-icon";
import { fontFamily } from "../styles/theme";
import { gap } from "../styles/sizes";
import { Arrow } from "../../pages/browse-projects/BrowseProjectPage";

export const DropdownPrimary = (props) => {
  const { options, onSelect, placeholder, selectedValues } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState([]);
  const handleSelect = (event) => {
    const tempValues = [...values];
    if (event.target.checked) {
      tempValues.push(event.target.value);
    } else {
      const index = tempValues.indexOf(event.target.value);
      if (index !== -1) {
        tempValues.splice(index, 1); // Removes one item at found index
      }
    }
    setValues(tempValues);
    onSelect(tempValues);
  };

  return (
    <DropdownContainer>
      <Dropdown>
        <Input readOnly onClick={() => setIsOpen(!isOpen)} />
        <Toggleicon onClick={() => setIsOpen(!isOpen)}>
          <Arrow open={isOpen}>▶</Arrow>
        </Toggleicon>
        <Placeholder>{placeholder || "Select or Search"}</Placeholder>
        {isOpen && (
          <DropdownList>
            <DropdownItem>
              {options?.map((data, index) => (
                <CheckboxContainer key={index}>
                  <CheckBox
                    type="checkbox"
                    checked={
                      selectedValues?.indexOf(data?.value) !== -1 ? true : false
                    }
                    value={data?.value}
                    onChange={(event) => handleSelect(event)}
                  />
                  <CheckboxLabel>{data?.text}</CheckboxLabel>
                </CheckboxContainer>
              ))}
            </DropdownItem>
          </DropdownList>
        )}
      </Dropdown>
    </DropdownContainer>
  );
};
const CheckboxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${gap}px;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  accent-color: ${primaryDarkColor}; /* This changes the color of the checked state */
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  color: ${primaryDarkColor};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 8px;
  left: 13px;
  color: ${gray};
`;

const Toggleicon = styled.div`
  position: absolute;
  top: 8px;
  right: 13px;
  cursor: pointer;
`;
const DropdownContainer = styled.div`
  margin: 0;
`;

const Dropdown = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 96%;
  border-radius: 4px;
  font-size: 14px;
  height: 37px;
  border: ${gray} solid 1px;
  padding-left: 20px;
  border-radius: 30px;
`;

const DropdownList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #ddd;
  }
  padding: ${gap * 2}px;
`;

const NoMatches = styled.li`
  padding: 8px;
  color: #888;
`;
const Select = styled.select`
  width: 96%;
  border-radius: 4px;
  font-size: 14px;
  height: 42px;
  border: ${gray} solid 1px;
  padding-left: 14px;
`;
const Option = styled.option``;
