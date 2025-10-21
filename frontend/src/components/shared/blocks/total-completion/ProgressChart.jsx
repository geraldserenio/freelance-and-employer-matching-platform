import styled from "styled-components";

const ProgressChart = ({ percentage = 82 }) => {
  return (
    <ProgressBar>
      <ProgressFill percentage={percentage} />
    </ProgressBar>
  );
};

export default ProgressChart;
const ProgressBar = styled.div`
  width: 100%;
  height: 12rem;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background: #118ab2;
  transition: width 0.5s ease-in-out;
`;
