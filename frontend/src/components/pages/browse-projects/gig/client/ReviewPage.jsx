import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../../../shared/modal/Modal";
import { ReviewForm } from "../../../projects/ReviewForm";

export const ReviewPage = () => {
  const location = useLocation();
  const project_id = location.state?.project_id;
  const user_id = location.state?.user_id;
  const [isReviewFormModalOpen, setIsReviewFormModalOpenModalOpen] =
    useState(true);
  const toggleReviewModal = () =>
    setIsReviewFormModalOpenModalOpen(!isReviewFormModalOpen);

  return (
    <Modal
      isOpen={isReviewFormModalOpen}
      onClose={toggleReviewModal}
      title="Review"
    >
      <ReviewForm user_id={user_id} projectId={project_id} />
    </Modal>
  );
};
