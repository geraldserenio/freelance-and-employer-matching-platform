import React, { useEffect } from "react";
import styled from "styled-components";
import { FreelancerDashboard } from "./freelancer-dashboard/FreelancerDashboard";
import { BusinessDashboard } from "./business-dashboard/BusinessDashboard";
import { PageHeader } from "../../navigation/page-header";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { UserList } from "../user-management";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const role = userData?.user?.user_type;
  const first_name = userData?.user?.first_name;

  useEffect(() => {
    if (!userData) {
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
    }
  }, []);

  return (
    <>
      {role === "freelancers" ? <FreelancerHeader /> : <BusinessHeader />}
      <DashboardContainer>
        {role === "freelancers" ? (
          <FreelancerDashboard firstName={first_name} />
        ) : role === "business" ? (
          <BusinessDashboard firstName={first_name} />
        ) : (
          <UserList />
        )}
      </DashboardContainer>
    </>
  );
};

const DashboardContainer = styled.div`
  margin-top: 3%;
  background-color: #f8f8f8;
  font-family: "Poppins", sans-serif;
`;
