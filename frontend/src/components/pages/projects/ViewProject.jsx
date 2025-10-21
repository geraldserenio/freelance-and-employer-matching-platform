import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { fontFamily } from "../../shared/styles/theme";
import { black, primaryColor, white } from "../../shared/styles/color";
import { gap } from "../../shared/styles/sizes";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectInfo } from "./ProjectInfo";
import { getProjectByIdService } from "../../../services/project/project-service";
import { Freelancers } from "./Freelancers";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import { SaveButton } from "./AddProject";
import Modal from "../../shared/modal/Modal";
import { FreelancerSubmitRequest } from "../browse-projects/FreelancerSubmitRequest";
import { getAlreadyProposedFreelancer } from "../../../services/project-proposal-service/project-proposal-service";

export const ViewProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId;
  const viaProjectBrowsing = location.state?.viaProjectBrowsing;
  const [projectInfo, setProjectInfo] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [proposalCount, setProposalCount] = useState();

  if (!user) {
    navigate("/sign-up");
  }

  useEffect(() => {
    async function fetchData() {
      const projectInfoResult = await getProjectByIdService(projectId);
      setProjectInfo(projectInfoResult?.data.result?.data[0]);
    }
    fetchData();

    async function fetchAlreadyProposedFreelancer() {
      const result = await getAlreadyProposedFreelancer(projectId);

      setProposalCount(result?.data?.result?.data);
    }

    fetchAlreadyProposedFreelancer();
  }, []);
  const [selectedFreelancers, setSelectedFreelancers] = useState(false);
  const toggleWithdrawModal = () =>
    setSelectedFreelancers(!selectedFreelancers);

  return (
    <Container>
      {user?.user?.user_type === "freelancers" ? (
        <FreelancerHeader />
      ) : (
        <BusinessHeader />
      )}
      <ProjectInfo {...projectInfo} />
      <Modal
        isOpen={selectedFreelancers}
        onClose={toggleWithdrawModal}
        title="Submit Request"
      >
        <FreelancerSubmitRequest projectId={projectId} />
      </Modal>
      <JobDetails>
        <Section>
          <SectionHeader>Project description</SectionHeader>
          <UL>
            <LI>{projectInfo?.project_description}</LI>
          </UL>
        </Section>
        {!viaProjectBrowsing ? (
          <Section>
            <SectionHeader>Freelancers</SectionHeader>
            {projectInfo?.job_listings?.length > 0
              ? projectInfo?.job_listings[0]?.job_applicants?.map(
                  (data, index) => {
                    return (
                      <Freelancers
                        {...data?.applicants}
                        key={index}
                        projectId={projectId}
                      />
                    );
                  },
                )
              : null}
          </Section>
        ) : (
          <div style={{ textAlign: "right", marginTop: gap * 3 }}>
            {loggedInUser?.user?.id != projectInfo?.businessUser?.id && (
              <SaveButton
                // onClick={() => {
                //   navigate("/messages", {
                //     state: {
                //       recipientId: projectInfo?.businessUser?.id,
                //       photo: projectInfo?.businessUser?.photo,
                //       fullname: `${projectInfo?.businessUser?.first_name} ${projectInfo?.businessUser?.middle_name} ${projectInfo?.businessUser?.last_name}`,
                //     },
                //   });
                // }}
                style={{
                  opacity: proposalCount > 0 ? 0.5 : 1,
                  cursor: proposalCount > 0 ? "not-allowed" : "pointer",
                }}
                onClick={
                  proposalCount > 0
                    ? () => {}
                    : () => {
                        setSelectedFreelancers(!selectedFreelancers);
                      }
                }
              >
                {proposalCount > 0 ? "Already submitted" : "Submit Request"}
              </SaveButton>
            )}
          </div>
        )}
      </JobDetails>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const JobDetails = styled.div`
  padding: 80px;
  display: grid;
  gap: ${gap * 6}px;
`;

const SectionHeader = styled.span`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: ${black};
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: ${gap}px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const UL = styled.ul``;

const LI = styled.li`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  color: ${black};
  list-style: none;
`;

export const ApplyButton = styled.a`
  width: auto;
  height: auto;
  border-radius: 100px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  color: ${primaryColor};
  border: 1px solid ${primaryColor};
  background-color: transparent;
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
  letter-spacing: 0%;
  cursor: pointer;
  background-color: ${primaryColor};
  color: ${white};
  padding-top: 14px;
  padding-right: 40px;
  padding-bottom: 14px;
  padding-left: 40px;
  text-decoration: none;
`;
