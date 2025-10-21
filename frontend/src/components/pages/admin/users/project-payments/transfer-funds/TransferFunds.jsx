import React, { useEffect, useState } from "react";
import axios from "axios";
import { SaveButton } from "../../../../projects/AddProject";
import { StyledInput } from "../../../../../shared/inputs/LoginField";
import { gap } from "../../../../../shared/styles/sizes";
import { getSpecificProjectMilestoneByActualIdService } from "../../../../../../services/project-milestone-service/project-milestone-service";
import { BASE_URL } from "../../../../../../helper/base-url";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TagLabel } from "../../../../Dashboard/ProfileInfo";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const TransferFunds = (props) => {
  const { projectMilestoneId, toggleModal, setFetchFlag, fetchFlag } = props;
  const [amount, setAmount] = useState("");
  const [milestoneInfo, setMilestoneInfo] = useState();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [clientsComment, setClientsComment] = useState();

  const handleTransfer = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to transfer funds",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const liberShareAmount = amount * 0.15;
        const netAmount = parseFloat(amount) - parseFloat(liberShareAmount);

        try {
          const res = await axios.post(
            `${BASE_URL}transfer-funds`,
            {
              amount: parseInt(netAmount) * 100, // cents
              currency: "usd",
              id: milestoneInfo?.id,
              connectedAccountId:
                milestoneInfo?.project_milestone_for_freelancer?.gig_applicants
                  ?.stripe_account,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData?.token}`,
              },
            },
          );

          if (res?.status == 200) {
            Swal.fire({
              title: "Success!",
              text: "Fund transferred.",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then(async (result) => {
              if (result.isConfirmed) {
                setFetchFlag(fetchFlag);
                toggleModal();
              }
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Something went wrong.",
            text: error?.response?.data?.message,
            icon: "error",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(async (result) => {
            if (result.isConfirmed) {
            }
          });
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    async function fetchSpecificProjectMilestoneByIdService() {
      const result =
        await getSpecificProjectMilestoneByActualIdService(projectMilestoneId);
      setMilestoneInfo(result?.data?.result?.data);
      setClientsComment(result?.data?.result?.clientsComments);
      const user_stripe_account =
        result?.data?.result?.data?.project_milestone_for_freelancer
          ?.gig_applicants?.stripe_account;
      const liberShareAmount = result?.data?.result?.data?.amount * 0.15;
      const netAmount =
        parseFloat(result?.data?.result?.data?.amount) -
        parseFloat(liberShareAmount);

      setAmount(netAmount);
      if (!user_stripe_account) {
        toggleModal();
        Swal.fire({
          title: "No stripe account",
          text: "Freelancer does not have an stripe account yet. Please contact the freelancer to create one",
          icon: "error",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate("/gig-payments");
          }
        });
      }
    }

    fetchSpecificProjectMilestoneByIdService();
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <RowContainer>
        <TagLabel style={{ width: "150px" }}>Freelancer:</TagLabel>
        <StyledInput
          value={`  ${
            milestoneInfo?.project_milestone_for_freelancer?.gig_applicants
              ?.first_name
          } ${
            milestoneInfo?.project_milestone_for_freelancer?.gig_applicants
              ?.last_name
          }`}
          readOnly
        />
      </RowContainer>
      <RowContainer>
        <TagLabel style={{ width: "150px" }}>Project name:</TagLabel>
        <StyledInput
          value={`  ${
            milestoneInfo?.project_milestone_for_freelancer?.project_gig_details
              ?.project_na
          }`}
          readOnly
        />
      </RowContainer>

      <RowContainer>
        <TagLabel style={{ width: "150px" }}>Liber %:</TagLabel>{" "}
        <StyledInput value={`15%`} />
      </RowContainer>
      <RowContainer>
        <TagLabel style={{ width: "150px" }}>Amount: </TagLabel>{" "}
        <StyledInput value={`${milestoneInfo?.amount} `} />
      </RowContainer>

      <RowContainer>
        <TagLabel style={{ width: "152px" }}>Net amount:</TagLabel>{" "}
        <StyledInput
          style={{ marginBottom: gap }}
          type="number"
          value={amount}
          readOnly
          placeholder="Amount in USD"
        />
      </RowContainer>

      <RowContainer>
        <TagLabel style={{ width: "200px" }}>Client's comment:</TagLabel>
        <TextArea defaultValue={clientsComment?.stars} />
      </RowContainer>
      <RowContainer>
        <TagLabel style={{ width: "138px" }}></TagLabel>
        <div style={{ color: "#f5c518", textTransform: "capitalize" }}>
          <FaStar /> {clientsComment?.reviews} ★
        </div>
      </RowContainer>
      <RowContainer>
        <TagLabel style={{ width: "150px" }}>Project status:</TagLabel>
        <span style={{ color: "green", textTransform: "capitalize" }}>
          {
            milestoneInfo?.project_milestone_for_freelancer?.project_gig_details
              ?.status
          }
        </span>
      </RowContainer>
      <div style={{ textAlign: "right" }}>
        <SaveButton onClick={handleTransfer}>Transfer Funds</SaveButton>
      </div>
    </div>
  );
};

export default TransferFunds;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap}px;
  margin-top: ${gap}px;
  margin-bottom: ${gap}px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #dfe3e8;
  resize: none;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
`;
