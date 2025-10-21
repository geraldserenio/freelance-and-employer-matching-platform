import React, { useState } from "react";
import styled from "styled-components";

import { StyledInput } from "../../shared/inputs/LoginField";
import { gap } from "../../shared/styles/sizes";
import { fontFamily } from "../../shared/styles/theme";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../shared/generic/headers";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TagLabel } from "../projects/ProjectInfo";
import { ButtonSection, SaveButton } from "../projects/AddProject";
import { RequiredIndication } from "../Dashboard/ProfileInfo";
import { gray } from "../../shared/styles/color";
import { storeProjectProposalService } from "../../../services/project-proposal-service/project-proposal-service";
import { Option, Select } from "../freelancer-courses/AddCourse";

export const FreelancerSubmitRequest = ({ projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.project_id = projectId;
    data.status = "pending";
    const response = await storeProjectProposalService(data);
    if (response?.status == 200) {
      Swal.fire({
        title: "Successful!",
        text: `Request Submitted.`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/browse-projects");
        }
      });
    } else {
      if (response?.data?.message === "No token provided") {
        dispatch(logout());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FieldContainer>
          <TagLabel>
            Proposal Message<RequiredIndication> *</RequiredIndication>
          </TagLabel>
          <TextArea
            placeholder="Proposal Message"
            id="message"
            {...register("message", {
              required: "Message is required",
            })}
          />
          {errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}
        </FieldContainer>
        <FieldContainer>
          <TagLabel>
            Proposal timeline<RequiredIndication> *</RequiredIndication>
          </TagLabel>

          <Select
            id="timeline"
            {...register("timeline")}
            style={{ width: "100%" }}
          >
            <Option value={"1 Week"}>1 Week</Option>
            <Option value={"2 Weeks"}>2 Weeks</Option>
            <Option value={"1 Month"}>1 Month</Option>
            <Option value={"6 Months"}>6 Months</Option>
            <Option value={"9 Months"}>9 Months</Option>
            <Option value={"1 Year"}>1 Year</Option>
            <Option value={"Other"}>1 Year</Option>
          </Select>
          {errors.timeline && (
            <ErrorMessage>{errors.timeline.message}</ErrorMessage>
          )}
        </FieldContainer>
        <FieldContainer>
          <TagLabel>Portfolio</TagLabel>
          <StyledInput
            placeholder="Portfolio"
            id="portfolio"
            {...register("portfolio")}
          />
        </FieldContainer>
        <FieldContainer style={{ marginTop: `${gap * 2}px` }}>
          <TagLabel style={{ color: gray }}>Pending</TagLabel>
        </FieldContainer>

        <ButtonSection style={{ justifyContent: "start" }}>
          <SaveButton type="submit" style={{ marginTop: "10px" }}>
            {"Submit Request"}
          </SaveButton>
        </ButtonSection>
      </div>
    </form>
  );
};

const TextArea = styled.textarea`
  border: 1px solid #99aebb;
  min-height: 100px;
  min-width: 470px;
  padding: ${gap}px;
  border-radius: 6px;
  font-family: ${fontFamily.font};
`;

const FieldContainer = styled.div`
  display: grid;
  text-align: left;
  gap: ${gap}px;
  margin-bottom: ${gap}px;
`;
