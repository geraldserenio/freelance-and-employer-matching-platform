import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { SaveButton } from "../projects/AddProject";
import { gap } from "../../shared/styles/sizes";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateGigPaymentStatus } from "../../../services/project-milestone-service/project-gig-payment/project-gig-paymet-service";

export const GigCheckoutForm = (props) => {
  const { project_id, user_id } = props;
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
        title: "Success!",
        text: "Gig Payment success.",
        icon: "success",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateGigPaymentStatus({
            stripe_id: paymentIntent?.id,
            status: paymentIntent?.status,
          });
          navigate("/review", {
            state: {
              project_id: project_id,
              user_id: user_id,
            },
          });
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
