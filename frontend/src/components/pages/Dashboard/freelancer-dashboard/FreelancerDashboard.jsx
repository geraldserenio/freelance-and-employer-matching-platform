import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FreelanceDashRecommended } from "./stats-and-recommended/FreelanceDashRecommended";
import { FreelanceDashProjectStats } from "./stats-and-recommended/FreelanceDashProjectStats";
import { FreelanceDashActiveProjects } from "./active-projects/FreelanceDashActiveProjects";
import {
  EarningsGraphData,
  totalEarnings,
} from "../mock-data/freelanceDashboardMockData";
import { DashboardHeading } from "../../../shared/blocks/dashboard-heading/DashboardHeading";
import { freelanceDashHeadingImg } from "../../../../assets/s3Assets";
import Earnings from "../../../shared/blocks/earnings-bar-graph/Earnings";
import {
  getProjecStats,
  getRecommendedProject,
} from "../../../../services/project/project-service";
import { useSelector } from "react-redux";
import useProjectStats from "../../../../hooks/dashboard/useProjectStats";
import useMappedProjects from "../../../../hooks/dashboard/useMapActiveProjects";
import { getAllActiveProjectsByFreelancerService } from "../../../../services/job-applicants/job-applicants-services";
import { getColumns } from "./table-columns";
import Modal from "../../../shared/modal/Modal";
import { Withdraw } from "../../payments/freelancer/Withdraw";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { getRecommendedProjectByUserId } from "../../../../services/reviews/reviews-service";

export const FreelancerDashboard = ({ firstName }) => {
  const [projecStats, setProjecStats] = useState([]);
  const [recommendedProject, setRecommendedProject] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const userData = useSelector((state) => state?.auth?.userData);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [page, setPage] = useState(1);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [jobListingId, setJobListingId] = useState("");
  const toggleWithdrawModal = () =>
    setIsWithdrawModalOpen(!isWithdrawModalOpen);

  useEffect(() => {
    async function fetchData() {
      const projecStatsResult = await getProjecStats({
        user_id: userData?.user?.id,
      });
      const recommendedProjectResult = await getRecommendedProject();
      const freelancerActiveProjectResult =
        await getAllActiveProjectsByFreelancerService(
          loggedInUser?.user?.id,
          page,
          loggedInUser?.token,
        );

      setProjecStats(projecStatsResult?.data?.data);
      const rows = {
        data: freelancerActiveProjectResult?.data?.result?.data?.map((row) => ({
          ...row,
          project_status: row?.job_listings_for_freelancer?.project?.status,
          deadline: row?.job_listings_for_freelancer?.project?.deadline,
          project_name: row?.job_listings_for_freelancer?.project?.project_name,
          payment_terms:
            row?.job_listings_for_freelancer?.project?.payment_terms,
          client: `${
            row?.job_listings_for_freelancer?.users?.first_name ?? ""
          } ${row?.job_listings_for_freelancer?.users?.last_name ?? ""}`,
        })),
        meta: freelancerActiveProjectResult?.data?.result?.meta,
      };
      setActiveProjects(rows);
    }

    async function fetchRecommendedProject() {
      const result = await getRecommendedProjectByUserId(
        loggedInUser?.user?.id,
      );
      setRecommendedProject(result?.data?.result?.data);
    }
    fetchRecommendedProject();
    fetchData();
  }, [page]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleWithdraw = (row) => {
    setProjectName(row?.project_name);
    setClient(row?.client);
    setJobListingId(row?.job_listings_for_freelancer?.id);
    setIsWithdrawModalOpen(!isWithdrawModalOpen);
  };
  const columns = getColumns(handleWithdraw);

  return (
    <DashboardContainer>
      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={toggleWithdrawModal}
        title="Request Withdrawal"
      >
        <Withdraw
          client={client}
          projectName={projectName}
          jobListingId={jobListingId}
        />
      </Modal>
      <DashboardHeading
        headingText={"Find your next freelance role with Liber"}
        userName={firstName}
        imageSrc={freelanceDashHeadingImg}
      />
      <DashboardContent>
        <StatsContainer>
          <FreelanceDashProjectStats
            projectStats={useProjectStats(projecStats)}
          />
          <FreelanceDashRecommended dashRecommendedData={recommendedProject} />
        </StatsContainer>
        <Earnings
          EarningsGraphData={EarningsGraphData}
          totalEarnings={totalEarnings}
          graphTitle={"Earnings"}
        />
        <FreelanceDashActiveProjects
          rows={activeProjects || []}
          columns={columns}
          handleChangePage={handleChangePage}
        />
      </DashboardContent>
    </DashboardContainer>
  );
};

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding-bottom: 2em;
  margin: ${deviceMargin.mobile}px;
    @media (min-width: ${tabletDevice}px) {
      margin: ${deviceMargin.tablet}px;  d
    }
  
    @media (min-width: ${desktopDevice}px) {
      margin: ${deviceMargin.largeScreen}px;  
    }
  
    @media (min-width: ${largeScreens}px) {
      margin: ${deviceMargin.largeScreen}px;  d
    }
`;

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 0 2em;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 1em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
