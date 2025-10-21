import React from "react";
import styled from "styled-components";
import { DashboardHeading } from "../../../shared/blocks/dashboard-heading/DashboardHeading";
import { dashboardHeadingImg } from "../../../../assets/s3Assets";
import { WhiteStyledPaper } from "../../../shared/containers/dashboard";
import { DashboardContainer } from "../freelancer-dashboard/FreelancerDashboard";
import Earnings from "../../../shared/blocks/earnings-bar-graph/Earnings";
import {
  EarningsGraphData,
  totalEarnings,
} from "../mock-data/freelanceDashboardMockData";
import { RecentProjects } from "../../../shared/blocks/recent-projects/RecentProjects";
import { projectData } from "../mock-data/BusinessDashboardMockData";
import CallToActionContainer from "../../../shared/blocks/dashboard-call-to-actions/CallToActionContainer";
import DashboardCalendar from "../../../shared/blocks/dashboard-calendar/DashboardCalendar";
import TotalCompletion from "../../../shared/blocks/total-completion/TotalCompletion";

export const BusinessDashboard = ({ firstName }) => {
  return (
    <DashboardContainer>
      <DashboardHeading
        userName={firstName}
        headingText="Hire with ease, find expertise. "
        imageSrc={dashboardHeadingImg}
      />
      <DashboardContent>
        <StatsContainer>
          <WhiteStyledPaper style={{ flex: "1.2" }}>
            <Earnings
              EarningsGraphData={EarningsGraphData}
              totalEarnings={4321.78}
              graphTitle={"Expenses"}
            />
          </WhiteStyledPaper>
          <WhiteStyledPaper style={{ flex: ".8" }}>
            <RecentProjects recentProjectData={projectData} />
          </WhiteStyledPaper>
        </StatsContainer>
        <WhiteStyledPaper>
          <DashboardCalendar />
        </WhiteStyledPaper>
        <StatsContainer>
          <WhiteStyledPaper style={{ flex: 0.9 }}>
            <TotalCompletion />
          </WhiteStyledPaper>
          <div style={{ flex: 1.1 }}>
            <CallToActionContainer />
          </div>
        </StatsContainer>
      </DashboardContent>
    </DashboardContainer>
  );
};

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 0 2em;

  @media (max-width: 768px) {
    padding: 0 0;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
