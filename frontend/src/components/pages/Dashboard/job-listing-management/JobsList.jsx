import React, { useEffect, useState } from "react";
import { BusinessHeader } from "../../../navigation/page-header/BusinessHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteJob,
  getAllJobListingByBusiness,
} from "../../../../services/job-listings/job-listings-services";
import { logout } from "../../../../redux/reducer/authReducer";
import { getColumns } from "./table-columns";
import Datatable from "../../../shared/datatable";
import { gap } from "../../../shared/styles/sizes";
import { SubHeading } from "../../../shared/generic/headers";
import { ApplyButton } from "../../job-listing/ApplicationPage";
import { primaryColor } from "../../../shared/styles/color";
import LoadingScreen from "../../../shared/loading/LoadingScreen";

export const JobsList = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const user = loggedInUser?.user;
  const [jobsList, setJobsList] = useState([]);

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchFlag, setFetchFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      const list = await getAllJobListingByBusiness(
        loggedInUser?.user?.id,
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
        setJobsList(list?.data?.result);
        setLoading(false);
      }
    }

    fetchProject();
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

  const handleViewJob = (row) => {
    navigate("/view-applicants", { state: { jobId: row?.id } });
  };

  const columns = getColumns(
    handleEditProjects,
    handleDeleteJob,
    handleViewJob,
  );

  return (
    <div>
      <BusinessHeader />
      <Container>
        <HeaderContanier>
          <SubHeading style={{ margin: 0, color: primaryColor }}>
            Jobs list
          </SubHeading>
          <ApplyButton
            onClick={() => {
              navigate("/create-job");
            }}
          >
            Post a job
          </ApplyButton>
        </HeaderContanier>
        {loading ? (
          <LoadingScreen styles={{ height: "60vh" }} />
        ) : (
          <Datatable
            total={jobsList.meta?.total}
            perPage={jobsList.meta?.perPage}
            totalPages={jobsList.meta?.totalPages}
            page={page}
            handlePageChange={handleChangePage}
            rows={jobsList?.data}
            columns={columns}
          />
        )}
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
