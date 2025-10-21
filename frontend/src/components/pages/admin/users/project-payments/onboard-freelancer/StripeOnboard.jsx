import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../../helper/base-url";
import { SaveButton } from "../../../../projects/AddProject";

const StripeOnboard = (props) => {
  const { freelancer_id } = props;
  const [connectedAccountId, setConnectedAccountId] = useState("");

  const handleCreateAccount = async () => {
    const res = await axios.post(
      `${BASE_URL}create-stripe-account?freelancer_id=${freelancer_id}`,
    );

    window.localStorage.setItem("connectedAccountId", res.data.accountId);
    window.location.href = res.data.url;
  };

  return (
    <div>
      <SaveButton onClick={handleCreateAccount}>
        Connect Stripe (Onboarding)
      </SaveButton>
    </div>
  );
};

export default StripeOnboard;
