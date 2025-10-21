import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { TagLabel } from "../projects/ProjectInfo";
import { BASE_URL } from "../../../helper/base-url";
import { gray, panelBackground } from "../../shared/styles/color";
import { gap } from "../../shared/styles/sizes";

export const ListOfConversation = (props) => {
  return (
    <Container
      onClick={() =>
        props?.handleSetRecipient({
          id: props?.senderId?.id,
          fullname: `${props?.senderId?.first_name} ${props?.senderId?.middle_name} ${props?.senderId?.last_name}`,
          photo: props?.senderId?.photo,
        })
      }
    >
      <NameContainer>
        {/* <Icon
          src={
            props?.senderId?.photo
              ? `${BASE_URL}uploads/${props?.senderId?.photo}`
              : generateIcon("Empty")
          }
          style={{ borderRadius: "28px", height: "25px", width: "25px" }}
        /> */}
        <NameMessageRow>{props?.senderId?.first_name}</NameMessageRow>
      </NameContainer>
      <TagLabel style={{ fontSize: "13px" }}>{props?.message}</TagLabel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: ${gap}px;
  gap: ${gap - 5}px;
  border: 1px solid ${gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${panelBackground};
  }
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NameMessageRow = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 10px;
  color: #666;
  text-align: center;
`;
