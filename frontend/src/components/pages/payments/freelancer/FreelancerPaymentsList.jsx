import React, { useEffect, useState } from "react";
import { BusinessHeader } from "../../../navigation/page-header/BusinessHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteJob } from "../../../../services/job-listings/job-listings-services";
import { logout } from "../../../../redux/reducer/authReducer";
import { getColumns } from "./table-columns";
import Datatable from "../../../shared/datatable";
import { gap } from "../../../shared/styles/sizes";
import { SubHeading } from "../../../shared/generic/headers";
import { ApplyButton } from "../../job-listing/ApplicationPage";
import {
  getAllPayments,
  getPaymentByFreelancerId,
} from "../../../../services/payments/payments-services";
import { primaryColor } from "../../../shared/styles/color";

export const FreelancerPaymentsList = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [paymentsList, setPaymentsList] = useState([]);

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchFlag, setFetchFlag] = useState(false);
  const [status, setStatus] = useState("approved");
  useEffect(() => {
    async function fetchPayments() {
      // if (loggedInUser?.user?.user_type !== "freelancers") {
      //   Swal.fire({
      //     title: "Page restricted!",
      //     text: "Please, login again.",
      //     icon: "warning",
      //     confirmButtonText: "OK",
      //     allowOutsideClick: false,
      //     allowEscapeKey: false,
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       dispatch(logout());
      //     }
      //   });
      // }
      const list = await getPaymentByFreelancerId(
        loggedInUser?.user?.id,
        status,
        page,
        loggedInUser?.token,
      );
      if (list?.status === 401) {
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
          data: list?.data?.result?.data?.map((row) => ({
            ...row,
            project_name: row?.job_listings?.project?.project_name,
            client: `${row?.job_listings?.users?.first_name ?? ""} ${
              row?.job_listings?.users?.last_name ?? ""
            }`,
          })),
          meta: list?.data?.result?.meta,
        };
        setPaymentsList(rows);
      }
    }

    fetchPayments();
  }, [page, fetchFlag]);

  const handleDeleteJob = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting job, will be deleted forever",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteJob(row?.id);
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEditProjects = (row) => {
    navigate("/update-job", { state: { jobId: row?.id } });
  };

  const columns = getColumns(handleEditProjects, handleDeleteJob);

  return (
    <div>
      <BusinessHeader />
      <Container>
        <HeaderContanier>
          <SubHeading style={{ margin: 0, color: primaryColor }}>
            Payment requests
          </SubHeading>
        </HeaderContanier>
        <Datatable
          total={paymentsList.meta?.total}
          perPage={paymentsList.meta?.perPage}
          totalPages={paymentsList.meta?.totalPages}
          page={page}
          handlePageChange={handleChangePage}
          rows={paymentsList?.data}
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
