import styled from "styled-components";
import ProgramOverviewItem from "./ProgramOverviewItem";
import { getPrograms } from "../../../../services/programs/programs";
import { useEffect, useState } from "react";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const ProgrammeOverview = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getPrograms({ page: 1, limit: 5 });
      setPrograms(result?.data?.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Title>Programme Overview</Title>
      <Content>
        {programs.length > 0 ? (
          programs.map((program, index) => (
            <ProgramOverviewItem key={program.id || index} {...program} />
          ))
        ) : (
          <Placeholder>No programs available.</Placeholder>
        )}
      </Content>
    </Container>
  );
};

export default ProgrammeOverview;

// Styled Components
const Container = styled.div`
  margin-top: 5rem;
  margin: ${deviceMargin.mobile}px;
  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
  }
`;

const Title = styled.div`
  font-size: 2.6em;
  text-align: left;
`;

const Content = styled.div`
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Placeholder = styled.div`
  font-size: 1.2em;
  color: #999;
  text-align: center;
  padding: 2em;
`;
