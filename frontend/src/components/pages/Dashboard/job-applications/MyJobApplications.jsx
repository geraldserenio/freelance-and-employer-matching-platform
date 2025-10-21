import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getColumns, getFreelancerColumns } from "./table-columns";
import Datatable from "../../../shared/datatable";
import { gap } from "../../../shared/styles/sizes";
import { SubHeading } from "../../../shared/generic/headers";
import { primaryColor } from "../../../shared/styles/color";
import { FreelancerHeader } from "../../../navigation/page-header/FreelancerHeader";
import { getAllActiveProjectsByFreelancerService } from "../../../../services/job-applicants/job-applicants-services";
import { useNavigate } from "react-router-dom";

export const MyJobApplications = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [freelanceProjects, setFreelanceProjects] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchFreelanceProject() {
      const freelancerActiveProjectResult =
        await getAllActiveProjectsByFreelancerService(
          loggedInUser?.user?.id,
          page,
          loggedInUser?.token,
        );

      const rows = {
        data: freelancerActiveProjectResult?.data?.result?.data?.map((row) => ({
          ...row,
          qualification: row?.job_listings_for_freelancer?.qualification,
          responsibilities: row?.job_listings_for_freelancer?.responsibilities,
          job_title: row?.job_listings_for_freelancer?.job_title,
          client: `${
            row?.job_listings_for_freelancer?.users?.first_name ?? ""
          } ${row?.job_listings_for_freelancer?.users?.last_name ?? ""}`,
        })),
        meta: freelancerActiveProjectResult?.data?.result?.meta,
      };
      setFreelanceProjects(rows);
    }

    fetchFreelanceProject();
  }, [page]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleViewProjects = (row) => {
    navigate("/job-application", {
      state: {
        jobId: row?.job_listings_for_freelancer?.id,
        status: row?.job_listings_for_freelancer?.status,
      },
    });
  };
  const columns = getFreelancerColumns(handleViewProjects);

  return (
    <div>
      <FreelancerHeader />
      <Container>
        <HeaderContanier>
          <SubHeading style={{ margin: 0, color: primaryColor }}>
            My job applications
          </SubHeading>
        </HeaderContanier>
        <Datatable
          total={freelanceProjects?.meta?.total}
          perPage={freelanceProjects?.meta?.perPage}
          totalPages={freelanceProjects?.meta?.totalPages}
          page={page}
          handlePageChange={handleChangePage}
          rows={freelanceProjects?.data}
          columns={columns}
        />
      </Container>
    </div>
  );
};

const HeaderContanier = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${gap * 3}px;
  margin-bottom: ${gap * 3}px;
`;

const Container = styled.div`
  padding: ${gap * 3}px;
`;
