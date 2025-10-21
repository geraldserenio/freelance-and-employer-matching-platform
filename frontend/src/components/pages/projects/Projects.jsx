import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import {
  deleteProject,
  getListOfProjectsByBusinessId,
} from "../../../services/project/project-service";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import Datatable from "../../shared/datatable";
import { getColumns } from "./table-columns";
import styled from "styled-components";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import { SubHeading } from "../../shared/generic/headers";
import { ApplyButton } from "../job-listing/ApplicationPage";
import { useNavigate } from "react-router-dom";
import { primaryColor } from "../../shared/styles/color";
import { getAllActiveProjectsByFreelancerService } from "../../../services/job-applicants/job-applicants-services";
import { getFreelancerColumns } from "./freelancer-table-columns";
import Modal from "../../shared/modal/Modal";
import { Withdraw } from "../payments/freelancer/Withdraw";
import LoadingScreen from "../../shared/loading/LoadingScreen";

export const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchFlag, setFetchFlag] = useState(false);
  const [freelanceProjects, setFreelanceProjects] = useState();
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [jobListingId, setJobListingId] = useState("");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const toggleWithdrawModal = () =>
    setIsWithdrawModalOpen(!isWithdrawModalOpen);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      const projects = await getListOfProjectsByBusinessId(
        page,
        loggedInUser?.user?.id,
        loggedInUser?.token,
      );
      if (projects?.status === 401) {
        setLoading(false);
        Swal.fire({
          title: "Session Expired!",
          text: "Please, login again.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout());
          }
        });
      } else {
        const rows = {
          data: projects?.data?.result?.data?.map((row) => ({
            ...row,
            isFreelancer: role == "freelancer" ? true : false,
          })),
          meta: projects?.data?.result?.meta,
        };
        setProjectList(rows);

        setLoading(false);
      }
    }

    async function fetchFreelanceProject() {
      try {
        setLoading(true);
        const freelancerActiveProjectResult =
          await getAllActiveProjectsByFreelancerService(
            loggedInUser?.user?.id,
            page,
            loggedInUser?.token,
          );

        const rows = {
          data: freelancerActiveProjectResult?.data?.result?.data?.map(
            (row) => ({
              ...row,
              project_status: row?.job_listings_for_freelancer?.project?.status,
              project_description:
                row?.job_listings_for_freelancer?.project?.project_description,
              project_terms:
                row?.job_listings_for_freelancer?.project?.project_terms,
              deadline: row?.job_listings_for_freelancer?.project?.deadline,
              project_name:
                row?.job_listings_for_freelancer?.project?.project_name,
              payment_terms:
                row?.job_listings_for_freelancer?.project?.payment_terms,
              client: `${
                row?.job_listings_for_freelancer?.users?.first_name ?? ""
              } ${row?.job_listings_for_freelancer?.users?.last_name ?? ""}`,
            }),
          ),
          meta: freelancerActiveProjectResult?.data?.result?.meta,
        };
        setFreelanceProjects(rows);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    }

    if (role === "business") {
      fetchProject();
    } else {
      fetchFreelanceProject();
    }
  }, [page, fetchFlag]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEditProjects = (row) => {
    navigate("/update-project", { state: { projectId: row?.id } });
  };

  const handleDeleteProjects = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting project, will be deleted forever",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProject(row?.id);
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleViewProjects = (row) => {
    navigate("/view-project", { state: { projectId: row?.id } });
  };

  const columns = getColumns(
    handleEditProjects,
    handleViewProjects,
    handleDeleteProjects,
  );

  const handleWithdraw = (row) => {
    setProjectName(row?.project_name);
    setClient(row?.client);
    setJobListingId(row?.job_listings_for_freelancer?.id);
    setIsWithdrawModalOpen(!isWithdrawModalOpen);
  };

  const freelancerColumns = getFreelancerColumns(handleWithdraw, navigate);

  return (
    <div>
      {role === "business" ? <BusinessHeader /> : <FreelancerHeader />}
      <Container>
        {role === "business" ? (
          <div>
            <HeaderContanier>
              <SubHeading style={{ margin: 0, color: primaryColor }}>
                Projects
              </SubHeading>
              <ApplyButton
                onClick={() => {
                  navigate("/add-project");
                }}
              >
                Add Project
              </ApplyButton>
            </HeaderContanier>
            {loading ? (
              <LoadingScreen styles={{ height: "50vh" }} />
            ) : (
              <Datatable
                total={projectList?.meta?.total}
                perPage={projectList?.meta?.perPage}
                totalPages={projectList?.meta?.totalPages}
                page={page}
                handlePageChange={handleChangePage}
                rows={projectList?.data}
                columns={columns}
              />
            )}
          </div>
        ) : (
          <div>
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
            <HeaderContanier>
              <SubHeading style={{ margin: 0, color: primaryColor }}>
                My projects
              </SubHeading>
            </HeaderContanier>
            <Datatable
              total={freelanceProjects?.meta?.total}
              perPage={freelanceProjects?.meta?.perPage}
              totalPages={freelanceProjects?.meta?.totalPages}
              page={page}
              handlePageChange={handleChangePage}
              rows={freelanceProjects?.data}
              columns={freelancerColumns}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

const HeaderContanier = styled.div`
  display: grid;
  gap: ${gap}px;
  justify-content: space-between;
  margin-top: ${gap * 3}px;
  margin-bottom: ${gap * 3}px;
  @media (min-width: ${tabletDevice}px) {
    display: grid;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;

const Container = styled.div`
  padding: ${gap * 3}px;
`;
