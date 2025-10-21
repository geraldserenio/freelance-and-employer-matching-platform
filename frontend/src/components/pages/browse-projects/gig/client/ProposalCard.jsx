import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../../../shared/styles/theme";
import {
  gray,
  primaryColor,
  primaryDarkColor,
  white,
} from "../../../../shared/styles/color";
import { generateIcon, Icon } from "../../../../shared/icons/generate-icon";
import { BASE_URL } from "../../../../../helper/base-url";
import { gap } from "../../../../shared/styles/sizes";

const ProposalCard = ({
  name,
  role,
  message,
  timeline,
  portfolio,
  photo,
  onAccept,
  onReject,
}) => {
  return (
    <Card>
      <Header>
        <Icon
          src={photo ? `${BASE_URL}uploads/${photo}` : generateIcon("Empty")}
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
        />
        <NameRole>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </NameRole>
      </Header>

      <Message>{message}</Message>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Timeline>
          <strong>Proposal timeline</strong>
          <br />
          {timeline}
        </Timeline>

        <PortfolioButton>
          <a
            href={portfolio}
            target="_blank"
            style={{ textDecoration: "none", color: white }}
          >
            Portfolio
          </a>
        </PortfolioButton>
      </div>

      <Actions>
        <ActionButton type="accept" onClick={onAccept}>
          <span style={{ color: "#2e7d32" }}>✔ </span>Accept
        </ActionButton>
        <ActionButton type="reject" onClick={onReject}>
          <span style={{ color: "#d32f2f" }}>✖ </span>Reject
        </ActionButton>
      </Actions>
    </Card>
  );
};

export default ProposalCard;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  text-align: left;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap}px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 12px;
`;

const NameRole = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  font-family: ${fontFamily?.font};
`;

const Role = styled.div`
  font-size: 14px;
  color: #666;
  font-family: ${fontFamily?.font};
`;

const Message = styled.p`
  margin: 12px 0;
  font-size: 15px;
  font-family: ${fontFamily?.font};
`;

const Timeline = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  font-family: ${fontFamily?.font};
`;

const PortfolioButton = styled.button`
  background-color: ${primaryColor};
  color: ${white};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  height: 30px;
  font-family: ${fontFamily?.font};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 0;
  margin: 0 4px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-family: ${fontFamily?.font};
  background-color: ${white};

  ${({ type }) =>
    type === "accept"
      ? `
    color: ${primaryDarkColor};
    border: 1px solid  ${gray};
  `
      : `
    color: ${primaryDarkColor};
    border: 1px solid ${gray};
  `}
`;
