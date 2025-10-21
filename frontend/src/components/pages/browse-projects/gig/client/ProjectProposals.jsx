import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  acceptOrRejectApplicantService,
  getAllProjectProposalByApplicantService,
  getAllProjectProposalByBusinessIdService,
} from "../../../../../services/project-proposal-service/project-proposal-service";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/reducer/authReducer";
import Datatable from "../../../../shared/datatable";
import { primaryColor } from "../../../../shared/styles/color";
import { SubHeading } from "../../../../shared/generic/headers";
import { ApplyButton } from "../../../projects/ViewProject";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../../shared/loading/LoadingScreen";
import { gap } from "../../../../shared/styles/sizes";
import { AccountHeader } from "../../../../navigation/account-header/AccountHeader";
import { getColumns } from "./table-columns";
import Modal from "../../../../shared/modal/Modal";
import ProposalCard from "./ProposalCard";
import MilestoneSubmitted from "./Milestone";

export const ProjectProposals = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [list, setList] = useState();
  const [freelancerId, setFreelancerId] = useState(null);
  const [fetchFlag, setFetchFlag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMilestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMilestoneModal = () =>
    setMilestoneModalOpen(!isMilestoneModalOpen);
  const [gigID, setGigId] = useState(null);
  const [freelancerInfo, setFreelancerInfo] = useState({
    name: "",
    role: "",
    message: "",
    timeline: "",
    photo: "",
  });

  const handleView = (row) => {
    setFreelancerId(row?.id);
    setFreelancerInfo({
      name: `${row?.gig_applicants?.first_name} ${row?.gig_applicants?.last_name}`,
      role: row?.gig_applicants?.job_title,
      timeline: row?.timeline,
      portfolio: row?.portfolio,
      photo: row?.gig_applicants?.photo,
      message: row?.message,
    });
    setIsModalOpen(true);
  };

  const handleViewMilestone = (row) => {
    setGigId(row?.id);
    setMilestoneModalOpen(true);
  };

  const columns = getColumns(handleView, handleViewMilestone);

  useEffect(() => {
    async function fetchGig() {
      const result = await getAllProjectProposalByBusinessIdService(page);

      if (result?.status === 401) {
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
          data: result?.data?.result?.data?.map((row) => ({
            ...row,
            project_name: row?.project_gig_details?.project_name,
            freelancer_name: `${row?.gig_applicants?.first_name} ${row?.gig_applicants?.last_name}`,
          })),
          meta: result?.data?.result?.meta,
        };
        setList(rows);

        setLoading(false);
      }
    }

    fetchGig();
  }, [fetchFlag]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleAccept = async () => {
    const result = await acceptOrRejectApplicantService(
      freelancerId,
      "in_progress",
    );
    if (result?.status === 200) {
      setLoading(false);
      Swal.fire({
        title: "Accepted.",
        text: "Successfully Accepted.",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsModalOpen(!isModalOpen);
          setFetchFlag(!fetchFlag);
        }
      });
    }
  };

  const handleReject = async () => {
    const result = await acceptOrRejectApplicantService(
      freelancerId,
      "rejected",
    );
    if (result?.status === 200) {
      setLoading(false);
      Swal.fire({
        title: "Rejected.",
        text: "Successfully Rejected.",
        icon: "error",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsModalOpen(!isModalOpen);
          setFetchFlag(!fetchFlag);
        }
      });
    }
  };

  return (
    <div>
      <AccountHeader fetchFlag={fetchFlag} />
      <Container>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          title="Proposal Requests"
        >
          <ProposalCard
            name={freelancerInfo?.name}
            role={freelancerInfo?.role}
            message={freelancerInfo?.message}
            timeline={freelancerInfo?.timeline}
            portfolio={freelancerInfo?.portfolio}
            photo={freelancerInfo?.photo}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </Modal>
        <Modal
          isOpen={isMilestoneModalOpen}
          onClose={toggleMilestoneModal}
          title="Milestone Submitted"
        >
          <MilestoneSubmitted
            gigID={gigID}
            toggleMilestoneModal={toggleMilestoneModal}
            setFetchFlag={setFetchFlag}
            fetchFlag={fetchFlag}
          />
        </Modal>
        <HeaderContanier>
          <SubHeading style={{ margin: 0, color: primaryColor }}>
            Gig proposals
          </SubHeading>
        </HeaderContanier>
        {loading ? (
          <LoadingScreen styles={{ height: "50vh" }} />
        ) : (
          <Datatable
            total={list?.meta?.total}
            perPage={list?.meta?.perPage}
            totalPages={list?.meta?.totalPages}
            page={page}
            handlePageChange={handleChangePage}
            rows={list?.data}
            columns={columns}
          />
        )}
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: ${gap * 3}px;
`;

const HeaderContanier = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${gap * 3}px;
  margin-bottom: ${gap * 3}px;
`;
