import React from "react";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import { generateIcon, Icon } from "../icons/generate-icon";

export const ActionButton = (props) => {
  const { title, handleClick } = props;
  return (
    <Container>
      <Tooltip title={title ?? ""}>
        <Button onClick={handleClick ?? null}>
          <Icon
            style={{ height: "30px", width: "30px" }}
            src={generateIcon(title)}
          />
        </Button>
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  margin: 0 auto;
  cursor: pointer;
`;

export const ActionContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
