import styled from "styled-components";
import { priceFormatter } from "../../../../helper/priceFormatter";
import { SecondaryButtonStyle } from "../../button/buttonsStyles";

const RecentProjectItem = ({
  projectName = "Project Name",
  value,
  progress = 0,
  status,
  isLastItem,
}) => {
  return (
    <Container isLastItem={isLastItem}>
      <Header>
        <ProjectInfo>
          <ProjectIcon />
          <ProjectDetails>
            <ProjectName>{projectName}</ProjectName>
            <ProjectValue>{priceFormatter(value)}</ProjectValue>
          </ProjectDetails>
        </ProjectInfo>
        <SecondaryButtonStyle>View details</SecondaryButtonStyle>
      </Header>

      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>

      <StatusText>Status: {status}</StatusText>
    </Container>
  );
};

export default RecentProjectItem;

const Container = styled.div`
  padding: 1em 0;
  border-bottom: ${(props) =>
    props.isLastItem ? "none" : "1px solid #99AEBB"};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectInfo = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const ProjectIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  background: #ff32b0;
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.div`
  font-weight: bold;
`;

const ProjectValue = styled.div`
  color: #666;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background: #eff7fa;
  height: 10px;
  border-radius: 30px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  background: ${(props) =>
    props.progress >= 70
      ? "#00CC66"
      : props.progress >= 50
        ? "#F97316"
        : "#99AEBB"};
  height: 100%;
  transition: width 0.5s ease-in-out;
`;

const StatusText = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #1d1e2b;
`;
