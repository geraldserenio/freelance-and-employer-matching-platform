import styled from "styled-components";
import { PrimaryButtonStyle } from "../../button/buttonsStyles";
import { useNavigate } from "react-router-dom";

const DashboardCallToActions = ({ title, buttonValue, isFirst, link }) => {
  const navigate = useNavigate();
  return (
    <Container isFirst={isFirst}>
      <Title isFirst={isFirst}>{title}</Title>
      <PrimaryButtonStyle onClick={() => navigate(link)}>
        {buttonValue}
      </PrimaryButtonStyle>
    </Container>
  );
};

export default DashboardCallToActions;

const Container = styled.div`
  background: ${({ isFirst }) => (isFirst ? "#1D1E2B" : "#C9E1E9")};
  border-radius: 30px;
  height: 5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
`;

const Title = styled.div`
  font-size: 30px;
  color: ${({ isFirst }) => (isFirst ? "white" : "black")};
`;
