import React, { useEffect, useRef, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { GigCheckoutForm } from "../../../subscription/GigCheckoutForm";
import { primaryColor } from "../../../../shared/styles/color";
import { BASE_URL } from "../../../../../helper/base-url";

const stripePromise = loadStripe(process.env.REACT_APP_PK_LIVE || "");

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const hasRun = useRef(false);
  const location = useLocation();
  const amount = location.state?.amount;
  const project_milestone_id = location.state?.project_milestone_id;
  const project_id = location.state?.project_id;
  const project_proposal_id = location.state?.project_proposal_id;
  const user_id = location.state?.user_id;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    axios
      .post(
        `${BASE_URL}create-payment-intent-for-gig`,
        {
          amount: dollarsToCents(amount),
          project_milestone_id: project_milestone_id,
          project_id: project_id,
          project_proposal_id: project_proposal_id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      ) // $5
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error(err));
  }, []);

  const dollarsToCents = (amountInDollars) => {
    return Math.round(amountInDollars * 100);
  };

  const appearance = { theme: "stripe" };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: primaryColor }}>Milestone Payment</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <GigCheckoutForm project_id={project_id} user_id={user_id} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
