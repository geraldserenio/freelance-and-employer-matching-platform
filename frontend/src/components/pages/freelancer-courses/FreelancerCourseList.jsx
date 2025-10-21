import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import Datatable from "../../shared/datatable";
import { getColumns } from "./table-columns";
import styled from "styled-components";
import { gap } from "../../shared/styles/sizes";
import { SubHeading } from "../../shared/generic/headers";
import { ApplyButton } from "../job-listing/ApplicationPage";
import { useNavigate } from "react-router-dom";
import { primaryColor } from "../../shared/styles/color";
import LoadingScreen from "../../shared/loading/LoadingScreen";
import {
  deleteCourse,
  getListOfCoursesByUserId,
  updatePublishStatusByIdController,
} from "../../../services/courses/courses-service";

export const FreelancerCourseList = () => {
  const [projectList, setProjectList] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchFlag, setFetchFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const projects = await getListOfCoursesByUserId(
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
            isFreelancer: role == "freelancers" ? true : false,
            isAdmin: role == "admin" ? true : false,
          })),
          meta: projects?.data?.result?.meta,
        };
        setProjectList(rows);

        setLoading(false);
      }
    }

    fetchCourses();
  }, [page, fetchFlag]);

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

  const handlePublishCourse = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to publish a course.",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updatePublishStatusByIdController(row?.id, "published");
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleViewProjects = (row) => {
    navigate("/view-course", { state: { courseId: row?.id } });
  };

  const columns = getColumns(
    handleEditProjects,
    handleViewProjects,
    handleDeleteProjects,
    handlePublishCourse,
  );

  return (
    <div>
      {role === "business" ? <BusinessHeader /> : <FreelancerHeader />}
      <Container>
        <div>
          <HeaderContanier>
            <SubHeading style={{ margin: 0, color: primaryColor }}>
              Courses
            </SubHeading>
            <ApplyButton
              onClick={() => {
                navigate("/create-course");
              }}
            >
              Add Courses
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
