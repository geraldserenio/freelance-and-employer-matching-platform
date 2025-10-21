// components/CourseCard.js
import React from "react";
import styled from "styled-components";
import { primaryColor } from "../../shared/styles/color";
import { fontFamily } from "../../shared/styles/theme";
import { generateIcon } from "../../shared/icons/generate-icon";

const CourseCard = ({
  attachment,
  title,
  course_user,
  reviews,
  price,
  tag,
}) => {
  return (
    <Card>
      <ImageWrapper>
        <img src={generateIcon(attachment)} alt={title} />
      </ImageWrapper>
      <Content>
        <Title>{title}</Title>
        <Author>{`${course_user?.first_name} ${course_user?.last_name}`}</Author>
        <Rating>{"★".repeat(Math.floor(reviews))}</Rating>
        <Price>${parseInt(price)?.toFixed(2)}</Price>
        {tag && <Badge type={tag}>{tag}</Badge>}
      </Content>
    </Card>
  );
};

export default CourseCard;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  width: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const ImageWrapper = styled.div`
  height: 140px;
  background: #f0f0f0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 16px;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 8px;
  font-family: ${fontFamily.font};
`;

const Author = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 8px;
  font-family: ${fontFamily.font};
`;

const Rating = styled.div`
  font-size: 14px;
  color: #ffa534;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 16px;
  font-family: ${fontFamily.font};
`;

const Badge = styled.span`
  font-family: ${fontFamily.font};
  background-color: ${({ type }) =>
    type === "Bestseller" ? "#38b000" : `${primaryColor}`};
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 5px;
  display: inline-block;
  margin-top: 8px;
`;
