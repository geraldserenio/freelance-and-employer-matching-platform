// MilestoneSubmitted.js
import React from "react";
import styled from "styled-components";
import { FaRegFile } from "react-icons/fa";
import { fontFamily } from "../../../../shared/styles/theme";
import { useEffect } from "react";
import {
  getSpecificProjectMilestoneByIdService,
  updateStatusToNeedsRevisionService,
} from "../../../../../services/project-milestone-service/project-milestone-service";
import { useState } from "react";
import { BASE_URL } from "../../../../../helper/base-url";
import { primaryColor, white } from "../../../../shared/styles/color";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "../../../../shared/modal/Modal";
import RevisionForm from "./RevisionForm";

const MilestoneSubmitted = (props) => {
  const { gigID, toggleMilestoneModal, setFetchFlag, fetchFlag } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  const [revisionMessage, setRevisionMessage] = useState();
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function fetchMilestone() {
      const result = await getSpecificProjectMilestoneByIdService(gigID);
      setInfo(result?.data.result?.data);
    }

    fetchMilestone();
  }, []);

  const handleGetTimestamp = () => {
    const now = new Date();
    const formatted = now?.toLocaleString(); // e.g., "7/16/2025, 9:32:10 PM"
    return formatted;
  };

  const submitRevision = async () => {
    const newRemarks = `${info?.remarks}\n${userData?.user?.first_name} (${handleGetTimestamp()}): ${revisionMessage}`;
    const result = await updateStatusToNeedsRevisionService(gigID, newRemarks);

    if (result.status == 200) {
      Swal.fire({
        title: "Success!",
        text: "Request revision submitted!",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          toggleMilestoneModal();
          setFetchFlag(!fetchFlag);
        }
      });
    }
  };

  const handleNeedsRevision = async () => {
    toggleModal();
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSetRevisionMessage = (e) => {
    setRevisionMessage(e.target.value);
  };

  return (
    <div>
      {info ? (
        <Container>
          <Modal
            isOpen={isModalOpen}
            onClose={toggleModal}
            title="Revision message"
          >
            <RevisionForm
              toggleModal={toggleModal}
              handleSubmitRevision={submitRevision}
              setRevisionMessage={handleSetRevisionMessage}
              revisionMessage={revisionMessage}
            />
          </Modal>
          <Label>Submitted file</Label>
          <FileDisplay>
            <FaRegFile />
            <FileName>
              <a
                href={`${BASE_URL}uploads/${info?.attachment}`}
                target="_blank"
                style={{ color: primaryColor }}
              >
                {info?.attachment}
              </a>
            </FileName>
          </FileDisplay>

          <Label>Amount</Label>
          <FileDisplay>
            <FileName>{info?.amount}</FileName>
          </FileDisplay>

          <Label>Text</Label>
          <TextArea defaultValue={info?.remarks} />

          <ButtonGroup>
            <Button
              onClick={() => {
                navigate("/gig-payment-form", {
                  state: {
                    amount: info?.amount,
                    project_milestone_id: info?.id,
                    project_id:
                      info?.project_milestone_for_freelancer?.project_id,
                    project_proposal_id: info?.project_applicants_id,
                    user_id: info?.user_id,
                  },
                });
              }}
            >
              Approve
            </Button>
            <Button outline onClick={handleNeedsRevision}>
              Request revision
            </Button>
          </ButtonGroup>
        </Container>
      ) : (
        <span style={{ color: primaryColor }}>No milestone submitted yet.</span>
      )}
    </div>
  );
};

export default MilestoneSubmitted;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: ${fontFamily.font};
  text-align: left;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 42px;
  font-size: 1rem;
  cursor: pointer;
  border: ${({ outline }) => (outline ? `1px solid ${primaryColor}` : "none")};
  background-color: ${({ outline }) => (outline ? "#fff" : primaryColor)};
  color: ${({ outline }) => (outline ? primaryColor : white)};
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ outline }) => (outline ? "#f0f4ff" : "#357ab8")};
  }
`;
