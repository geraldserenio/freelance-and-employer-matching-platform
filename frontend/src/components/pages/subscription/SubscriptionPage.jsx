import React, { useEffect, useRef, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CheckoutForm } from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import { primaryBtnColor, primaryColor } from "../../shared/styles/color";
import { BASE_URL } from "../../../helper/base-url";

const stripePromise = loadStripe(process.env.REACT_APP_PK_LIVE || "");

const SubscriptionPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const hasRun = useRef(false);
  const location = useLocation();
  const subscription_id = location.state?.subscription_id;
  let amount = 0;

  switch (subscription_id) {
    case 2:
      amount = 1899;
      break;
    case 3:
      amount = 3999;
      break;
    case 8:
      amount = 18899;
      break;
    default:
      amount = 0;
      break;
  }

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    axios
      .post(
        `${BASE_URL}create-payment-intent`,
        { amount: amount, subscription_id: subscription_id },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        },
      ) // $5
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error(err));
  }, []);

  const appearance = { theme: "stripe" };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: primaryColor }}>Subscribe to Our Plan</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default SubscriptionPage;
