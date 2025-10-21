import React from "react";
import styled from "styled-components";
import {
  gray,
  primaryColor,
  secondaryBlueColor,
} from "../../../shared/styles/color";
import { fontFamily } from "../../../shared/styles/theme";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { generateIcon, Icon } from "../../../shared/icons/generate-icon";
import { PDF_BASE_URL } from "../../../../helper/base-url";
import { formatKey } from "../../../../utils/textFormatter";
import Swal from "sweetalert2";
import { updateApplicationStatus } from "../../../../services/job-applicants/job-applicants-services";
import { useNavigate } from "react-router-dom";

export const Applicants = (props) => {
  const {
    first_name,
    middle_name,
    last_name,
    job_title,
    cv,
    photo,
    id,
    applicantion_id,
    application_status,
  } = props;
  const navigate = useNavigate();

  let bgColor = "#ccc";

  switch (application_status) {
    case "in_progress":
      bgColor = "#FFA500"; // Orange
      break;
    case "hired":
      bgColor = "#4CAF50"; // Green
      break;
    case "rejected":
      bgColor = "#FF4D4D"; // Red
      break;
    default:
      break;
  }

  const handleHire = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to hire a freelancer.",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateApplicationStatus({
          id: applicantion_id,
          status: "hired",
        });
        navigate("/jobs");
      }
    });
  };

  const handleReject = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject an applicant.",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateApplicationStatus({
          id: applicantion_id,
          status: "rejected",
        });
        navigate("/jobs");
      }
    });
  };

  return (
    <Container>
      <RowContainer>
        <LeftContainer>
          <Icon
            src={generateIcon(photo ?? "EmptyLogo")}
            style={{ width: "80px", height: "80px", borderRadius: "12px" }}
          />
          <NameContainer>
            <JobTitle>{`${first_name} ${middle_name} ${last_name}`}</JobTitle>
            <Name>{job_title}</Name>
          </NameContainer>
        </LeftContainer>
        <RightContainer>
          <span style={{ color: bgColor, fontWeight: 700 }}>
            {formatKey(application_status)}
          </span>
          <a href={PDF_BASE_URL + cv} target="_blank">
            <Icon
              style={{ height: "30px", width: "30px" }}
              src={generateIcon("View")}
            />
          </a>
          <Icon
            style={{ height: "30px", width: "30px", cursor: "pointer" }}
            src={generateIcon("Approve")}
            onClick={handleHire}
          />
          <Icon
            style={{ height: "30px", width: "30px", cursor: "pointer" }}
            src={generateIcon("Trash")}
            onClick={handleReject}
          />
        </RightContainer>
      </RowContainer>
    </Container>
  );
};

export const ApplyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap + 2}px;
`;

export const ApplyLink = styled.a`
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
  color: ${primaryColor};
  text-decoration: none;
  cursor: pointer;
`;

const Container = styled.div`
  padding: 40px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

export const RowContainer = styled.div`
  display: grid;
  border-bottom: 1px solid ${gray};
  padding: ${gap - 4}px;
  gap: ${gap * 5}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    border-bottom: 1px solid ${gray};
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${gray};
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${gray};
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RightContainer = styled.div`
  display: grid;
  gap: ${gap}px;
  align-items: center;
  margin-bottom: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    gap: ${gap}px;
    align-items: center;
    margin-bottom: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    gap: 42px;
    align-items: center;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    gap: 42px;
    align-items: center;
  }
`;

const Name = styled.div`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 28.8px;
  letter-spacing: -2%;
  color: ${gray};
`;

const JobTitle = styled.div`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 28.8px;
  letter-spacing: -2%;
`;

const NameContainer = styled.div`
  display: grid;
  align-items: center;
  text-align: left;
`;

const WorkDetailsTab = styled.div`
  background-color: ${secondaryBlueColor};
  font-family: ${fontFamily};
  font-weight: 400;
  font-size: 16px;
  line-height: 19.2px;
  letter-spacing: -2%;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

const WorkDetailsContainer = styled.div`
  display: flex;
  gap: ${gap}px;
`;
