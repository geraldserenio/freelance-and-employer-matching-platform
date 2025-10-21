import styled from "styled-components";
import { programmeOverviewImg1 } from "../../../../assets/s3Assets";
import { Divider } from "../../Dashboard/freelancer-dashboard/stats-and-recommended/FreelanceDashRecommended";
import OverViewTable from "./OverViewTable";
import {
  desktopDevice,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";

const ProgramOverviewItem = ({
  title = "Heading",
  image = programmeOverviewImg1,
  target_audience,
  weekly_duration,
  hourly_duration,
  delivery_method,
}) => {
  const table = {
    targetAudience: target_audience,
    deliveryMethods: delivery_method,
    duration: {
      weeks: weekly_duration,
      hoursPerWeek: hourly_duration,
    },
  };

  return (
    <Container>
      <ImageContainer src={image} />
      <Content>
        <Header>
          <div>{title}</div>
          <EnquireButton>Enquire</EnquireButton>
        </Header>
        <Divider />
        <TableContainer>
          <OverViewTable table={table} />
        </TableContainer>
      </Content>
    </Container>
  );
};

export default ProgramOverviewItem;

// Styled components
const Container = styled.div`
  background: #1d1e2b;
  border-radius: 30px;
  color: white;
  display: flex;
  padding: 1em;
  flex-direction: column-reverse; /* Default: Image on top for small screens */

  @media (min-width: ${tabletDevice}px) {
    flex-direction: column-reverse; /* Image still on top for tablets */
    align-items: center;
  }

  @media (min-width: ${desktopDevice}px) {
    flex-direction: row; /* Image moves to the left for desktop */
  }

  @media (min-width: ${largeScreens}px) {
    flex-direction: row; /* Maintain the same for large screens */
  }
`;

const ImageContainer = styled.img`
  height: 200px; /* Fixed height */
  object-fit: cover;
  border-radius: 12px;

  @media (min-width: ${tabletDevice}px) {
  }

  @media (min-width: ${desktopDevice}px) {
    width: 200px; /* Fixed width */
    height: 200px; /* Fixed height */
  }

  @media (min-width: ${largeScreens}px) {
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 2em;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const EnquireButton = styled.button`
  padding: 12px 24px;
  background: transparent;
  color: white;
  border-radius: 100px;
  border: 1px solid white;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TableContainer = styled.div`
  margin-top: 1em;
  overflow-x: auto;
`;
