import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  BackToListingButton,
  JobApplicationInfo,
} from "./job-header/JobApplicationInfo";
import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { fontFamily } from "../../shared/styles/theme";
import { black, primaryColor, white } from "../../shared/styles/color";
import { gap } from "../../shared/styles/sizes";
import { useLocation, useNavigate } from "react-router-dom";
import {
  apply,
  getJobListingList,
} from "../../../services/job-listings/job-listings-services";
import FileUpload from "../../shared/file-upload/FileUpload";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { checkAlreadyApplied } from "../../../services/job-applicants/job-applicants-services";

export const ApplicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;
  const status = location.state?.status || "open";

  const dispatch = useDispatch();

  const [jobListingInfo, setJobListingInfo] = useState([]);

  const [showUploadFile, setShowUploadFile] = useState(false);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const user = JSON.parse(localStorage.getItem("userData"));
  const targetRef = useRef(null);

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!user) {
    navigate("/sign-up");
  }

  useEffect(() => {
    async function fetchData() {
      const jobListingResult = await getJobListingList(jobId, status);
      const result = await checkAlreadyApplied({ jobId });
      setIsAlreadyApplied(result?.data?.result?.data);
      setJobListingInfo(jobListingResult?.data?.result?.data[0]);
    }
    fetchData();
  }, [jobId]);
  const handleApplyButton = () => {
    if (jobListingInfo?.is_external) {
      window.open("jobListingInfo?.external_link", "_blank");
    } else {
      setShowUploadFile(true);
      setTimeout(() => {
        handleScroll();
      }, 400);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleApply = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicant_id", user?.user?.id);
    formData.append("job_listing_id", jobId);

    const application = await apply(user?.token, formData);

    if (application?.status === 401) {
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
      Swal.fire({
        title: "Application submitted.",
        text: "Click OK, to go back to job listings",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/job-listings");
        }
      });
    }
  };

  return (
    <Container>
      <PageHeader />
      <JobApplicationInfo
        {...jobListingInfo}
        handleApplyButton={handleApplyButton}
      />
      <JobDetails>
        <Section>
          <SectionHeader>Qualifications</SectionHeader>
          <UL>
            <LI>{jobListingInfo?.qualification}</LI>
          </UL>
        </Section>
        <Section>
          <SectionHeader>Responsibilities</SectionHeader>
          <UL>
            <LI>{jobListingInfo?.responsibilities}</LI>
          </UL>
        </Section>
        <Section>
          <SectionHeader>About the company</SectionHeader>
          <Text>{jobListingInfo?.users?.about}</Text>
        </Section>
        {showUploadFile && (
          <Section ref={targetRef}>
            <FileUpload
              handleFileChange={handleFileChange}
              file={file}
              setFile={setFile}
            />
          </Section>
        )}
        <ButtonSection>
          {jobListingInfo?.created_by != user?.user?.id &&
            (isAlreadyApplied == 0 ? (
              <ApplyButton
                onClick={showUploadFile ? handleApply : handleApplyButton}
              >
                {showUploadFile ? "Submit Application" : "Apply"}
              </ApplyButton>
            ) : (
              <ApplyButton disabled={true} style={{ opacity: "0.4" }}>
                Applied
              </ApplyButton>
            ))}

          <BackToListingButton
            onClick={() => navigate("/job-listings")}
            style={{ marginTop: 0 }}
          >
            Back to listings
          </BackToListingButton>
        </ButtonSection>
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

const Text = styled(LI)`
  list-style-type: none;
  text-align: left;
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
