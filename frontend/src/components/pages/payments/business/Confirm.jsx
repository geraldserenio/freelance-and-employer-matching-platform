import React, { useEffect, useState } from "react";
import { TagLabel } from "../../Dashboard/ProfileInfo";
import { StyledInput } from "../../../shared/inputs/LoginField";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { gap } from "../../../shared/styles/sizes";
import { ButtonSection, TextArea } from "../../projects/AddProject";
import { SaveButton } from "../../Dashboard/job-listing-management/CreateJobListing";
import { ErrorMessage } from "../../../shared/generic/headers";
import { requestWithdrawalByFreelancer } from "../../../../services/payments/payments-services";
import { logout } from "../../../../redux/reducer/authReducer";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Confirm = ({
  paymenId,
  projectName,
  freelancer,
  setIsWithdrawModalOpen,
  amount,
  remarks,
  setFetchFlag,
  fetchFlag,
}) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({ amount, remarks });
  }, []);

  const onSubmit = async (data) => {
    data.status =
      loggedInUser?.user?.user_type === "admin" ? "completed" : "approved";
    data.id = paymenId;

    const response = await requestWithdrawalByFreelancer(data);
    if (response?.status == 200) {
      setLoginErrorMessage("");
      Swal.fire({
        title: "Successful!",
        text: `Reqeust withdrawal succesfully ${loggedInUser?.user?.user_type === "admin" ? "completed" : "approved"}!`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setFetchFlag(!fetchFlag);
          setIsWithdrawModalOpen(false);
        }
      });
    } else {
      setLoginErrorMessage(response?.data?.message);
      if (response?.data?.message === "No token provided") {
        dispatch(logout());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {loginErrorMessage && <ErrorMessage>{loginErrorMessage}</ErrorMessage>}
        <FieldContainer style={{ display: "flex", marginBottom: "10px" }}>
          <TagLabel>Project name:</TagLabel>
          <TagLabel>{projectName ?? ""}</TagLabel>
        </FieldContainer>
        <FieldContainer style={{ display: "flex", marginBottom: "10px" }}>
          <TagLabel>Freelancer:</TagLabel>
          <TagLabel>{freelancer ?? ""}</TagLabel>
        </FieldContainer>
        <FieldContainer>
          <TagLabel>Amount</TagLabel>
          <StyledInput
            placeholder="Amount"
            id="amount"
            {...register("amount", {
              required: "Amount is required",
            })}
          />
          {errors.amount && (
            <ErrorMessage>{errors.amount.message}</ErrorMessage>
          )}
        </FieldContainer>
        <FieldContainer style={{ marginTop: gap }}>
          <TagLabel>Remarks</TagLabel>
          <TextArea
            style={{ minWidth: "390px" }}
            placeholder="Remarks"
            id="remarks"
            {...register("remarks", {
              required: "Remarks is required",
            })}
          />
          {errors.remarks && (
            <ErrorMessage>{errors.remarks.message}</ErrorMessage>
          )}
        </FieldContainer>
        <ButtonSection style={{ justifyContent: "end" }}>
          <SaveButton type="submit" style={{ marginTop: "10px" }}>
            {loggedInUser?.user?.user_type === "admin" ? "Complete" : "Approve"}
          </SaveButton>
        </ButtonSection>
      </div>
    </form>
  );
};

const FieldContainer = styled.div`
  display: grid;
  text-align: left;
  gap: ${gap}px;
`;
