import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getAllProjectProposalByApplicantService } from "../../../../../services/project-proposal-service/project-proposal-service";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/reducer/authReducer";
import Datatable from "../../../../shared/datatable";
import { primaryColor } from "../../../../shared/styles/color";
import { getColumns } from "./table-columns";
import { SubHeading } from "../../../../shared/generic/headers";
import { ApplyButton } from "../../../projects/ViewProject";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../../shared/loading/LoadingScreen";
import { gap } from "../../../../shared/styles/sizes";
import { AccountHeader } from "../../../../navigation/account-header/AccountHeader";
import Modal from "../../../../shared/modal/Modal";
import SubmitMilestoneForm from "./SubmitMilestoneForm";

export const ProjectGig = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [list, setList] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [fetchFlag, setFetchFlag] = useState();
  const [gigId, setGigId] = useState();

  useEffect(() => {
    async function fetchGig() {
      const result = await getAllProjectProposalByApplicantService(page);
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
            client_name: row?.project_gig_details?.businessUser?.first_name,
          })),
          meta: result?.data?.result?.meta,
        };
        setList(rows);

        setLoading(false);
      }
    }

    fetchGig();
  }, []);

  const handleView = (row) => {
    setGigId(row?.id);
    toggleModal();
  };

  const columns = getColumns(handleView);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <AccountHeader fetchFlag={fetchFlag} />
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Submit Milestone"
      >
        <SubmitMilestoneForm
          gigId={gigId}
          setFetchFlag={setFetchFlag}
          fetchFlag={fetchFlag}
          toggleModal={toggleModal}
        />
      </Modal>
      <Container>
        <HeaderContanier>
          <SubHeading style={{ margin: 0, color: primaryColor }}>
            Gigs
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
