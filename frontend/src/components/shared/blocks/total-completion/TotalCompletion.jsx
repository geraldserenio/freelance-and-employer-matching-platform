import styled from "styled-components";
import { SecondaryButtonStyle } from "../../button/buttonsStyles";
import ProgressChart from "./ProgressChart";
import { useNavigate } from "react-router-dom";

const TotalCompletion = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <LeftSection>
          <Title>Total Completion</Title>
          <Subtitle>Projects complete on time</Subtitle>
          <ButtonWrapper>
            <SecondaryButtonStyle
              onClick={() => {
                navigate("/projects");
              }}
            >
              See all projects
            </SecondaryButtonStyle>
          </ButtonWrapper>
        </LeftSection>
        <RightSection>
          <Number>82</Number>
          <Percentage>%</Percentage>
        </RightSection>
      </Container>
      <ChartWrapper>
        <ProgressChart percentage={82} />
      </ChartWrapper>
    </>
  );
};

export default TotalCompletion;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const LeftSection = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Title = styled.div`
  font-size: 1.5em;
`;

const Subtitle = styled.div`
  color: #99aebb;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
`;

const RightSection = styled.div`
  display: flex;
  gap: 0.2em;
  align-items: flex-start;
`;

const Number = styled.div`
  color: #99aebb;
  font-size: 120px;
  font-weight: 600;
  line-height: 1;
`;

const Percentage = styled.div`
  color: #99aebb;
  font-size: 50px;
  font-weight: 600;
  line-height: 1;
`;

// Wrapper for the chart
const ChartWrapper = styled.div`
  width: 100%;
  height: 200px; /* Set a fixed height to prevent re-renders */
  margin-top: 1em;
`;
