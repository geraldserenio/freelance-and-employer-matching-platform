import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { updateSubscriptionStatus } from "../../../services/subscriptions/subscriptions-services";
import { SaveButton } from "../projects/AddProject";
import { gap } from "../../shared/styles/sizes";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (paymentIntent?.status == "succeeded") {
      Swal.fire({
        title: "Payment success",
        text: "Please, complete your profile.",
        icon: "success",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateSubscriptionStatus({
            stripe_id: paymentIntent?.id,
            status: paymentIntent?.status,
          });
          navigate("/register/freelancer/profile");
        }
      });
    } else {
      Swal.fire({
        title: "Payment failed",
        text: "Please, try again.",
        icon: "error",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
        }
      });
    }

    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <SaveButton disabled={!stripe} style={{ marginTop: gap }}>
        Pay
      </SaveButton>
      {message && <div style={{ color: "red" }}>{message}</div>}
    </form>
  );
};
