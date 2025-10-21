import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gray } from "../styles/color";
import { generateIcon } from "../icons/generate-icon";

export const DropdownSelect = (props) => {
  const { options, onSelect, placeholder } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (option) => {
    onSelect(option.value);
    setSearchTerm(filteredOptions?.length > 0 ? option.text : "");
    setIsOpen(false);
  };

  useEffect(() => {
    setSearchTerm("");
  }, [options]);

  return (
    <DropdownContainer>
      <Dropdown onClick={() => setIsOpen(!isOpen)}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setIsOpen(true);
            setSearchTerm(e.target.value);
            if (!e.target.value) {
              onSelect(e.target.value);
              setSearchTerm(e.target.value);
            }
          }}
        />
        {isOpen ? (
          <Toggleicon>{generateIcon("Close")}</Toggleicon>
        ) : (
          <Toggleicon>{generateIcon("ToggleDown")}</Toggleicon>
        )}
        {!searchTerm && (
          <Placeholder>{placeholder || "Select or Search"}</Placeholder>
        )}
        {isOpen && (
          <DropdownList>
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) => (
                <DropdownItem key={index} onClick={() => handleSelect(option)}>
                  {option.text}
                </DropdownItem>
              ))
            ) : (
              <NoMatches>No matches found</NoMatches>
            )}
          </DropdownList>
        )}
      </Dropdown>
    </DropdownContainer>
  );
};
const Placeholder = styled.div`
  position: absolute;
  top: 8px;
  left: 13px;
  color: ${gray};
`;

export const Toggleicon = styled.div`
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
`;

const NoMatches = styled.li`
  padding: 8px;
  color: #888;
`;

export const Select = styled.select`
  width: 96%;
  border-radius: 4px;
  font-size: 14px;
  height: 42px;
  border: ${gray} solid 1px;
  padding-left: 14px;
`;

export const Option = styled.option``;
