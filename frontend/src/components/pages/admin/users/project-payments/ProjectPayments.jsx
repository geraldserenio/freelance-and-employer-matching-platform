import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../../../redux/reducer/authReducer";
import { FreelancerHeader } from "../../../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../../../navigation/page-header/BusinessHeader";
import Datatable from "../../../../shared/datatable";
import { getColumns } from "./table-columns";
import styled from "styled-components";
import { gap } from "../../../../shared/styles/sizes";
import { SubHeading } from "../../../../shared/generic/headers";
import { useNavigate } from "react-router-dom";
import { primaryColor } from "../../../../shared/styles/color";
import LoadingScreen from "../../../../shared/loading/LoadingScreen";
import {
  deleteCourse,
  updatePublishStatusByIdController,
} from "../../../../../services/courses/courses-service";
import { getAllPaymentsFromGig } from "../../../../../services/project-payments/project-payments-services";
import Modal from "../../../../shared/modal/Modal";
import TransferFunds from "./transfer-funds/TransferFunds";

export const ProjectPayments = () => {
  const [projectList, setProjectList] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchFlag, setFetchFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectMilestoneId, setProjectMilestoneId] = useState(false);

  useEffect(() => {
    async function fetchSubscribers() {
      setLoading(true);
      const projects = await getAllPaymentsFromGig(page);
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
            isFreelancer: role == "freelancers" ? true : false,
            isAdmin: role == "admin" ? true : false,
          })),
          meta: projects?.data?.result?.meta,
        };
        setProjectList(rows);

        setLoading(false);
      }
    }

    fetchSubscribers();
  }, [page, fetchFlag]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEditProjects = (row) => {
    navigate("/update-course", { state: { courseId: row?.id } });
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
        await deleteCourse(row?.id);
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleTransferFunds = (row) => {
    toggleModal();
    setProjectMilestoneId(row?.project_milestone_id);
  };

  const handleViewProjects = (row) => {
    navigate("/view-course", { state: { courseId: row?.id } });
  };

  const columns = getColumns(handleTransferFunds);

  return (
    <div>
      {role === "business" ? <BusinessHeader /> : <FreelancerHeader />}
      <Container>
        <div>
          <HeaderContanier>
            <SubHeading style={{ margin: 0, color: primaryColor }}>
              Gig Payments
            </SubHeading>
            {/* <ApplyButton
              onClick={() => {
                navigate("/create-course");
              }}
            >
              Add Courses
            </ApplyButton> */}
            <Modal
              isOpen={isModalOpen}
              onClose={toggleModal}
              title="Transfer Funds"
            >
              <TransferFunds
                fetchFlag={fetchFlag}
                setFetchFlag={setFetchFlag}
                toggleModal={toggleModal}
                projectMilestoneId={projectMilestoneId}
              />
            </Modal>
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
