import React from "react";
import styled from "styled-components";
import { fontFamily } from "../../shared/styles/theme";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import {
  gray,
  primaryColor,
  secondaryBlueColor,
} from "../../shared/styles/color";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Listing = (props) => {
  const {
    id,
    job_title,
    contract_type,
    experience_level,
    work_setup,
    location,
    salary,
    exclusive,
  } = props;
  const { photo, first_name } = props?.users;

  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const isSubscribed = loggedInUser?.user?.subscribed;
  const navigate = useNavigate();

  return (
    <Container>
      <RowContainer>
        <LeftContainer>
          <Icon
            src={generateIcon(photo ?? "EmptyLogo")}
            style={{ width: "80px", height: "80px", borderRadius: "12px" }}
          />
          <NameContainer>
            <JobTitle>
              {job_title} {exclusive && <Tag>{"Exclusive"}</Tag>}
            </JobTitle>
            <Name>{first_name}</Name>
          </NameContainer>
        </LeftContainer>
        <RightContainer>
          <WorkDetailsContainer>
            {contract_type && <WorkDetailsTab>{contract_type}</WorkDetailsTab>}
            {experience_level && (
              <WorkDetailsTab>{experience_level}</WorkDetailsTab>
            )}
            {location && <WorkDetailsTab>{location}</WorkDetailsTab>}
            {salary && <WorkDetailsTab>{salary}</WorkDetailsTab>}
            {work_setup && <WorkDetailsTab>{work_setup}</WorkDetailsTab>}
          </WorkDetailsContainer>
          <ApplyContainer>
            <ApplyLink
              onClick={() =>
                loggedInUser
                  ? exclusive
                    ? isSubscribed
                      ? navigate("/job-application", { state: { jobId: id } })
                      : Swal.fire({
                          title: "You are not yet subscribed.",
                          text: "Please subsribe.",
                          icon: "warning",
                          confirmButtonText: "OK",
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                        })
                    : navigate("/job-application", { state: { jobId: id } })
                  : navigate("/sign-up")
              }
            >
              Apply
            </ApplyLink>{" "}
            <Icon
              src={generateIcon("ApplyArrow")}
              style={{ height: "24px", width: "24px" }}
            />
          </ApplyContainer>
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

const Tag = styled.span`
  color: #ff3333;
  font-size: 14px;
  border: 1px solid #ff3333;
  border-radius: 5px;
  padding: ${gap - 7}px;
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
  padding: ${deviceMargin.mobile}px;
  padding-top: 0px;
  padding-bottom: 0px;
  @media (min-width: ${tabletDevice}px) {
    padding: ${deviceMargin.tablet}px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: ${desktopDevice}px) {
    padding: ${deviceMargin.largeScreen}px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (min-width: ${largeScreens}px) {
    padding: ${deviceMargin.largeScreen}px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

export const RowContainer = styled.div`
  display: grid;
  border-bottom: 1px solid ${gray};
  padding: ${gap - 4}px;

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
  font-family: ${fontFamily.font};
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
  flex-wrap: wrap;
`;
