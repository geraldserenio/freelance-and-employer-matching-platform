import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  black,
  panelBackground,
  primaryColor,
  white,
} from "../../../shared/styles/color";
import { fontFamily } from "../../../shared/styles/theme";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { Footer } from "../../../navigation/footer/Footer";
import { BackToListingButton } from "../ProfileInfo";
import {
  Heading,
  Tag,
  TagContanier,
  TagLabel,
  TagsContainer,
} from "../../projects/ProjectInfo";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../../redux/reducer/authReducer";
import Swal from "sweetalert2";
import { getJobListingByIdService } from "../../../../services/job-listings/job-listings-services";
import { BusinessHeader } from "../../../navigation/page-header/BusinessHeader";
import { Applicants } from "./Applicants";
import LoadingScreen from "../../../shared/loading/LoadingScreen";

export const ViewJobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [projectInfo, setProjectInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getJob() {
      setLoading(true);
      const result = await getJobListingByIdService(jobId, loggedInUser?.token);
      if (result?.status === 401) {
        Swal.fire({
          title: "Session Expired!",
          text: "Please, login again.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout());
          }
        });
      } else {
        setProjectInfo(result?.data.result?.data[0]);
        setLoading(false);
      }
    }
    if (jobId) {
      getJob();
    }
  }, []);

  return (
    <Container>
      <BusinessHeader />
      {loading ? (
        <LoadingScreen />
      ) : (
        <form>
          <Container2>
            <Heading>Job</Heading>
            <TagsContainer>
              <TagContanier>
                <TagLabel>Job title</TagLabel>
                <Tag>{projectInfo?.job_title}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Location</TagLabel>
                <Tag>{projectInfo?.location}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Salary</TagLabel>
                <Tag>{projectInfo?.salary}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Contract type</TagLabel>
                <Tag>{projectInfo?.contract_type}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Experience level</TagLabel>
                <Tag>{projectInfo?.experience_level}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Work setup</TagLabel>
                <Tag>{projectInfo?.work_setup}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Status</TagLabel>
                <Tag>{projectInfo?.status}</Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Project</TagLabel>
                <Tag>
                  <a
                    href="#"
                    onClick={() =>
                      navigate("/update-project", {
                        state: { projectId: projectInfo?.project?.id },
                      })
                    }
                  >
                    {projectInfo?.project?.project_name}
                  </a>
                </Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>
                  External: {projectInfo?.is_external ? "Yes" : "No"}
                </TagLabel>
                <Tag>
                  {projectInfo?.is_external ? projectInfo?.external_link : ""}
                </Tag>
              </TagContanier>
              <TagLabel>
                Exclusive: {projectInfo?.is_exclusive ? "Yes" : "No"}
              </TagLabel>
            </TagsContainer>
          </Container2>
          <JobDetails>
            <FieldSection>
              <Section>
                <SectionHeader>Qualification</SectionHeader>
                {projectInfo?.qualification}
              </Section>
              <Section>
                <SectionHeader>Responsibilities</SectionHeader>
                {projectInfo?.responsibilities}
              </Section>
            </FieldSection>
            <Section>
              <SectionHeader>Applicants</SectionHeader>
              {projectInfo?.job_applicants?.length > 0
                ? projectInfo?.job_applicants?.map((data, index) => {
                    return (
                      <Applicants
                        {...data?.applicants}
                        cv={data?.resume}
                        application_status={data?.status}
                        key={index}
                        applicantion_id={data?.id}
                      />
                    );
                  })
                : null}
            </Section>
            <ButtonSection>
              <BackToListingButton
                onClick={() => navigate("/jobs")}
                style={{ marginTop: 0 }}
              >
                Back to jobs
              </BackToListingButton>
            </ButtonSection>
          </JobDetails>
        </form>
      )}

      <Footer />
    </Container>
  );
};

const Container2 = styled.div`
  background-color: ${panelBackground};
  text-align: start;
  padding: 72px;
  padding-top: 52px;
  padding-bottom: 42px;
  border-radius: 0px 0px 40px 40px;
  margin-bottom: 20px;
`;

const Container = styled.div``;

const Select = styled.select`
  border: 1px solid #99aebb;
  padding: ${gap + 5}px;
  border-radius: 6px;
  cursor: pointer;
  width: 295px;
`;

const Option = styled.option`
  border: 1px solid #99aebb;
  padding: ${gap}px;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  border: 1px solid #99aebb;
  min-height: 100px;
  min-width: 570px;
  padding: ${gap}px;
  border-radius: 6px;
  font-family: ${fontFamily.font};
`;

const JobDetails = styled.div`
  padding: 80px;
  display: grid;
  gap: ${gap * 6}px;
`;

const FieldSection = styled.div`
  display: grid;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
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

export const SaveButton = styled.button`
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
