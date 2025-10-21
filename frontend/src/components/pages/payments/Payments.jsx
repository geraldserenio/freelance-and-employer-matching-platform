import React, { useMemo } from "react";
import { AdminPaymentsList } from "./admin/AdminPaymentsList";
import { BusinessPaymentsList } from "./business/BusinessPaymentsList";
import { FreelancerPaymentsList } from "./freelancer/FreelancerPaymentsList";

export const Payments = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type || "freelancer";

  const Page = useMemo(() => {
    switch (role) {
      case "admin":
        return AdminPaymentsList;
      case "business":
        return BusinessPaymentsList;
      default:
        return FreelancerPaymentsList;
    }
  }, []);
  return (
    <div>
      <Page />
    </div>
  );
};
