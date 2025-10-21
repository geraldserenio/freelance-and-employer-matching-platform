import React from "react";
import styled from "styled-components";
import { WhiteStyledPaper } from "../../containers/dashboard";
import BarChartComponent from "./EarningsBarGrapgh";
import { SecondaryButtonStyle } from "../../button/buttonsStyles";
import { priceFormatter } from "../../../../helper/priceFormatter";
import { useNavigate } from "react-router-dom";

export const Earnings = ({ graphTitle, totalEarnings, EarningsGraphData }) => {
  const navigate = useNavigate();
  return (
    <StyledEarningsContainer>
      <EarningsHeader>
        <EarningsTitle>{graphTitle}</EarningsTitle>
        <SecondaryButtonStyle onClick={() => navigate("/track-payments")}>
          Track Payments
        </SecondaryButtonStyle>
      </EarningsHeader>
      <EarningsSubtitle>In the past month</EarningsSubtitle>
      <Divider />
      <TotalEarnings>{priceFormatter(totalEarnings)}</TotalEarnings>
      <BarChartComponent EarningsGraphData={EarningsGraphData} />
    </StyledEarningsContainer>
  );
};

// Styled Components
const StyledEarningsContainer = styled(WhiteStyledPaper)`
  height: 600px;
  padding: 1.5em;
`;

export const EarningsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EarningsTitle = styled.div`
  font-size: 1.5rem;
`;

export const EarningsSubtitle = styled.div`
  color: #99aebb;
  text-align: left;
`;

const Divider = styled.div`
  border-top: 1px solid #f7f7f7;
  margin: 2em 0;
`;

const TotalEarnings = styled.div`
  font-size: 40px;
  text-align: left;
`;

export default Earnings;
