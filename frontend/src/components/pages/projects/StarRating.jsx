import React, { useState } from "react";
import styled from "styled-components";

const StarContainer = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const Star = styled.span`
  font-size: 2rem;
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")};
  transition: color 0.2s;

  &:hover {
    color: #ffac33;
  }
`;

const StarRating = ({ totalStars = 5, initialRating = 0, onChange }) => {
  const [hovered, setHovered] = useState(null);
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <StarContainer>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            filled={hovered ? starValue <= hovered : starValue <= rating}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(starValue)}
          >
            ★
          </Star>
        );
      })}
    </StarContainer>
  );
};

export default StarRating;
