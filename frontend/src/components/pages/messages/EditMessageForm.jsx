import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestWithdrawalByFreelancer } from "../../../services/payments/payments-services";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { ErrorMessage } from "formik";
import { gap } from "../../shared/styles/sizes";
import { TagLabel } from "../projects/ProjectInfo";
import { SaveButton, TextArea } from "../freelancer-courses/AddCourse";
import { ButtonSection } from "../job-listing/ApplicationPage";
import styled from "styled-components";

export const EditMessageForm = ({ messageId, message }) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await requestWithdrawalByFreelancer(data);
    if (response?.status == 200) {
      setLoginErrorMessage("");
      Swal.fire({
        title: "Successful!",
        text: `Reqeust withdrawal succesfully submitted!`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/payments");
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

        <FieldContainer style={{ marginTop: gap }}>
          <TagLabel>Message</TagLabel>
          <TextArea
            value={message}
            style={{ minWidth: "390px" }}
            placeholder="Message"
            id="message"
            {...register("message", {
              required: "Message is required",
            })}
          />
          {errors.remarks && (
            <ErrorMessage>{errors.remarks.message}</ErrorMessage>
          )}
        </FieldContainer>
        <ButtonSection style={{ justifyContent: "end" }}>
          <SaveButton type="submit" style={{ marginTop: "10px" }}>
            Save
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
