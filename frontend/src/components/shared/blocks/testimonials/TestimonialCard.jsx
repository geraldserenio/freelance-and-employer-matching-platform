import React from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../icons/generate-icon";
import { fontFamily } from "../../styles/theme";
import { primaryDarkColor, white } from "../../styles/color";

export const TestimonialCard = (props) => {
  const { name, jobTitle, testimony, image, backgroundColor } = props;

  return (
    <CardContainer style={{ backgroundColor: backgroundColor ?? white }}>
      <Testimony>{testimony}</Testimony>
      <UserInfoContainer>
        <Icon
          src={generateIcon(image ?? "EmptyUserIcon")}
          style={{ height: "80px", width: "80px" }}
        />
        <div>
          <Name>{name}</Name>
          <JobTitle>{jobTitle}</JobTitle>
        </div>
      </UserInfoContainer>
    </CardContainer>
  );
};

const Testimony = styled.p`
  color: ${primaryDarkColor};
  font-size: 18px;
  font-weigt: 400;
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  font-size: 30px;
  text-align: center;
  border: 1px solid #99aebb;
  border-radius: 40px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 10px;
  letter-spacing: 0%;
  margin-bottom: 0;
  margin-top: 0;
  color: ${primaryDarkColor};
`;

const JobTitle = styled.span`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  color: ${primaryDarkColor};
`;
