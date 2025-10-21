import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { fontFamily } from "../../../../shared/styles/theme";
import { StyledInput } from "../../../../shared/inputs/LoginField";
import { primaryColor } from "../../../../shared/styles/color";
import { useRef } from "react";
import { useState } from "react";
import { generateIcon, Icon } from "../../../../shared/icons/generate-icon";
import { BASE_URL } from "../../../../../helper/base-url";
import { FaRegFile } from "react-icons/fa";
import {
  getAlreadySubmittedMilestoneFreelancer,
  getNeedsRevisionProjectMilestoneByIdService,
  storeMilestone,
} from "../../../../../services/project-milestone-service/project-milestone-service";
import Swal from "sweetalert2";
import { useEffect } from "react";

const SubmitMilestoneForm = (props) => {
  const { gigId, setFetchFlag, fetchFlag, toggleModal } = props;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [isFileValidated, setIsFileValidated] = useState(true);
  const [revisionID, setRevisionID] = useState();
  const [milestoneCount, setMilestoneCount] = useState(0);

  const onSubmit = async (data) => {
    if (!imageFile) {
      setIsFileValidated(false);
      return;
    }

    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (revisionID) {
      formData.append("id", revisionID);
    }
    formData.append("amount", data?.amount);
    formData.append("remarks", data?.remarks);
    formData.append("project_applicants_id", gigId);
    const store = await storeMilestone(formData);
    if (store?.status == 200) {
      Swal.fire({
        title: "Success!",
        text: "Milestone submitted!",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setFetchFlag(!fetchFlag);
          toggleModal();
        }
      });
    }
  };

  useEffect(() => {
    async function fetchNeedsRevision() {
      const result = await getNeedsRevisionProjectMilestoneByIdService();
      reset(result?.data?.result?.data);
      setRevisionID(result?.data?.result?.data?.id);
    }
    fetchNeedsRevision();

    async function fetchAlreadySubmittedMilestoneFreelancer() {
      const result = await getAlreadySubmittedMilestoneFreelancer(gigId);
      setMilestoneCount(result?.data?.result?.data);
    }

    fetchAlreadySubmittedMilestoneFreelancer();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    } else {
      alert("Please select a valid file.");
    }
  };

  const ShortFileDisplay = (filename) => {
    if (!filename) return null;

    const ext = filename.slice(filename?.lastIndexOf("."));
    const shortCode = filename.slice(0, 1) + ".." + filename.slice(1, 2) + ext;

    return shortCode;
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {milestoneCount > 0 ? (
        <span style={{ color: primaryColor }}>Milestone submitted.</span>
      ) : (
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledInputs
              type="file"
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div>
              <StyledInputs value="test" onClick={handleClick} />
            </div>
            <FileDisplay>
              <FaRegFile />
              <FileName>
                <span onClick={handleClick}>Upload file</span>
                <br></br>
                {ShortFileDisplay(imageFile?.name)}{" "}
              </FileName>
            </FileDisplay>
            {!isFileValidated && <ErrorText>File is required.</ErrorText>}

            <Label style={{ marginTop: "1.5rem" }}>Amount</Label>
            <StyledInput
              placeholder="Amount"
              type="number"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && <ErrorText>{errors.amount.message}</ErrorText>}

            <Label style={{ marginTop: "1.5rem" }}>Text</Label>
            <TextArea
              placeholder="Message (optional)"
              {...register("remarks", { required: "Message is required" })}
            />
            {errors.remarks && <ErrorText>{errors.remarks.message}</ErrorText>}

            <SubmitButton type="submit">Submit Milestone</SubmitButton>
          </form>
        </Container>
      )}
    </div>
  );
};

export default SubmitMilestoneForm;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  margin-top: 0;
  padding: 2rem;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: ${fontFamily.font};
  text-align: left;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f8f8f8;
  cursor: pointer;
`;

const StyledInputs = styled.input`
  display: none;
`;

const FileDisplay = styled.div`
  display: flex;
  align-items: center;
  background: #f6f7f9;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #333;
  box-sizing: border-box;
`;

const FileName = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${primaryColor};
  color: #fff;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1976d2;
  }
`;

const ErrorText = styled.p`
  color: #ff3b3b;
  font-size: 0.85rem;
  margin-top: 4px;
`;
