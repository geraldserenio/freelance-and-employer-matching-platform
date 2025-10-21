import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../icons/generate-icon";

export const OurClientCard = (props) => {
  const { client_name } = props;
  return (
    <CliensContainer>
      <Icon
        src={generateIcon(client_name ?? "ClientEmpty")}
        style={{ width: "100%", height: "100px" }}
      />
    </CliensContainer>
  );
};

const CliensContainer = styled.div``;
