import React, { useState } from "react";
import styled from "styled-components";

const HamburgerMenu = ({ onEdit, onUnsend }) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Icon onClick={() => setOpen(!open)}>⋮</Icon>
      {open && (
        <Dropdown>
          <DropdownItem onClick={onEdit}>Edit</DropdownItem>
          <DropdownItem onClick={onUnsend}>Unsend</DropdownItem>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default HamburgerMenu;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Icon = styled.div`
  font-size: 18px;
  cursor: pointer;
  user-select: none;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #f2f2f2;
  }
  &:last-child {
    color: red;
  }
`;
