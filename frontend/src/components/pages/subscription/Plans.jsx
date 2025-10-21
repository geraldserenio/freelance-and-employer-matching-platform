import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fontFamily } from "../../shared/styles/theme";
import { gap } from "../../shared/styles/sizes";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";

export const Plans = (props) => {
  const {
    id,
    planName,
    isRecommended,
    rate,
    inclusions,
    selected,
    handleSelect,
  } = props;

  return (
    <SubscriptionPlanCardContainer
      style={{ border: `2px solid ${isRecommended ? `#118AB2` : "#99aebb"}` }}
    >
      {isRecommended && <Recommended>Recommended</Recommended>}
      <PlanTitle>{planName}</PlanTitle>
      <PlanRate>{rate}</PlanRate>
      <hr></hr>
      {inclusions?.map((data, index) => {
        return (
          <PlanInclusionsContainer key={index}>
            <Icon src={generateIcon("Check")} />
            <PlanInclusions>{data?.title}</PlanInclusions>
          </PlanInclusionsContainer>
        );
      })}
      <GetStartedButton
        onClick={() => {
          handleSelect(id);
        }}
      >
        {selected == id ? "√" : "Get Started"}
      </GetStartedButton>
    </SubscriptionPlanCardContainer>
  );
};

const Recommended = styled.div`
  width: 142px;
  height: 41px;
  border-radius: 100px;
  background-color: #1d1e2b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${gap}px;
`;

const PlanInclusionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap}px;
  margin-top: 20px;
`;

const SubscriptionPlanCardContainer = styled.div`
  border-radius: 50px;
  border-width: 2px;
  height: 494px;
  padding: 40px;
  position: relative;
  box-sizing: border-box;
  flex: 1 0 32.3333%;
`;

const PlanTitle = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: start;
`;

const PlanRate = styled.p`
  margin-top: 18px;
  margin-bottom: 0;
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 40px;
  line-height: 60px;
  letter-spacing: 0%;
  text-align: start;
`;
const PlanInclusions = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: start;
`;

const GetStartedButton = styled.button`
  color: #ffffff;
  background-color: #118ab2;
  height: 54px;
  border-radius: 100px;
  padding-top: 16px;
  padding-right: 18px;
  padding-bottom: 16px;
  padding-left: 18px;
  border: 0;
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: 0%;
  position: absolute;
  bottom: 30px;
  left: 40px;
  cursor: pointer;
`;
