import React from "react";
import styled from "styled-components";
import { TagLabel } from "../../../pages/Dashboard/ProfileInfo";
import { StyledInput } from "../../inputs/LoginField";
import { gap } from "../../styles/sizes";
import {
  ButtonSection,
  Option,
  SaveButton,
  Select,
  TextArea,
} from "../../../pages/projects/AddProject";

export const ContactUsForm = () => {
  return (
    <form>
      <div>
        <FieldContainer>
          <TagLabel>Institution</TagLabel>
          <StyledInput placeholder="Institution" id="amount" />
        </FieldContainer>
        <FieldContainer>
          <TagLabel>Mobile</TagLabel>
          <StyledInput placeholder="Mobile" id="amount" />
        </FieldContainer>
        <FieldContainer>
          <TagLabel>Address</TagLabel>
          <StyledInput placeholder="Address" id="amount" />
        </FieldContainer>
        <FieldContainer>
          <TagLabel>Program Overview</TagLabel>
          <Select id="payment_condition">
            <Option value={"Social media and digital skills"}>
              Social media and digital skills
            </Option>
            <Option value={"AI for study and career success"}>
              AI for study and career success
            </Option>
            <Option value={"Build your first app"}>Build your first app</Option>
            <Option value={"Financial literacy"}>Financial literacy</Option>
          </Select>
        </FieldContainer>

        <ButtonSection style={{ justifyContent: "end" }}>
          <SaveButton type="submit" style={{ marginTop: "10px" }}>
            {"Submit"}
          </SaveButton>
        </ButtonSection>
      </div>
    </form>
  );
};

const FieldContainer = styled.div`
  display: grid;
  text-align: left;
  gap: ${gap}px;
  margin-bottom: ${gap}px;
`;
