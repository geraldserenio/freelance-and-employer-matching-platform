import React, { useState } from "react";
import styled from "styled-components";

import { TagLabel } from "./ProjectInfo";
import { StyledInput } from "../../shared/inputs/LoginField";
import { gap } from "../../shared/styles/sizes";
import { ButtonSection, SaveButton } from "./AddProject";
import { fontFamily } from "../../shared/styles/theme";
import StarRating from "./StarRating";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../shared/generic/headers";
import { reviewProjectService } from "../../../services/project/project-service";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ReviewForm = ({ user_id, projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState();

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const onSubmit = async (data) => {
    data.user_id = user_id;
    data.projectId = projectId;
    data.stars = rating;
    const response = await reviewProjectService(data);
    if (response?.status == 200) {
      Swal.fire({
        title: "Successful!",
        text: `Review Submitted.`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/projects");
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
          <TagLabel>Rating</TagLabel>
          <StarRating onChange={handleRatingChange} />
        </FieldContainer>
        <FieldContainer>
          <TagLabel>Review</TagLabel>
          <TextArea
            placeholder="Review"
            id="review"
            {...register("review", {
              required: "Review is required",
            })}
          />
          {errors.review && (
            <ErrorMessage>{errors.review.message}</ErrorMessage>
          )}
        </FieldContainer>

        <ButtonSection style={{ justifyContent: "end" }}>
          <SaveButton type="submit" style={{ marginTop: "10px" }}>
            {"Submit"}
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
