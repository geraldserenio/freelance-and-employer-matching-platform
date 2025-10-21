import React, { useState } from "react";
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
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import { ActionButton } from "../../shared/datatable/ActionButton";
import Modal from "../../shared/modal/Modal";
import { ReviewForm } from "./ReviewForm";

export const Freelancers = (props) => {
  const {
    first_name,
    middle_name,
    last_name,
    job_title,
    photo,
    id,
    projectId,
  } = props;

  const [isReviewFormModalOpen, setIsReviewFormModalOpenModalOpen] =
    useState(false);
  const toggleReviewModal = () =>
    setIsReviewFormModalOpenModalOpen(!isReviewFormModalOpen);
  return (
    <Container>
      <RowContainer>
        <Modal
          isOpen={isReviewFormModalOpen}
          onClose={toggleReviewModal}
          title="Review"
        >
          <ReviewForm user_id={id} projectId={projectId} />
        </Modal>
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
          {/* <WorkDetailsContainer>
            {email && <WorkDetailsTab>{email}</WorkDetailsTab>}
            {mobile && <WorkDetailsTab>{mobile}</WorkDetailsTab>}
            {address && <WorkDetailsTab>{address}</WorkDetailsTab>}
          </WorkDetailsContainer> */}
          <ActionButton
            title={"Review"}
            handleClick={() => toggleReviewModal()}
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
`;
