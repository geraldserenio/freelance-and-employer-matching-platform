import React from "react";
import { BusinessHeader } from "../page-header/BusinessHeader";
import { FreelancerHeader } from "../page-header/FreelancerHeader";

export const AccountHeader = (props) => {
  const { fetchFlag } = props;
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;
  return role === "business" ? (
    <BusinessHeader fetchFlag={fetchFlag} />
  ) : (
    <FreelancerHeader fetchFlag={fetchFlag} />
  );
};
