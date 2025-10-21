import React, { useState } from "react";
import styled from "styled-components";
import { fontFamily } from "../../styles/theme";
import { primaryDarkColor } from "../../styles/color";
import { CommonButton } from "../../inputs/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
import { ContactUsForm } from "./ContactUsForm";

export const GetStarted = (props) => {
  const {
    heading,
    subHeading,
    btnText,
    route,
    leftContainerBgColor = "#f3f5fd",
    leftContainerTextColor = { primaryDarkColor },
  } = props;
  const navigate = useNavigate();
  const [isContactUsFormModalOpen, setIsContactUsFormModalOpen] =
    useState(false);
  const toggleContactUsModal = () =>
    setIsContactUsFormModalOpen(!isContactUsFormModalOpen);

  const handleContactUsForm = () => {
    setIsContactUsFormModalOpen(!isContactUsFormModalOpen);
  };
  return (
    <Container bgColor={leftContainerBgColor}>
      <Modal
        isOpen={isContactUsFormModalOpen}
        onClose={toggleContactUsModal}
        title="Contact Us"
      >
        <ContactUsForm />
      </Modal>
      <LeftSide>
        <Heading textColor={leftContainerTextColor}>{heading}</Heading>
        <SubHeading textColor={leftContainerTextColor}>{subHeading}</SubHeading>
        <CommonButton onClick={handleContactUsForm}>{btnText}</CommonButton>
      </LeftSide>
      <RightContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: ${(props) => props.bgColor};
  margin-top: 95px;
`;

const RightContainer = styled.div`
  width: 40%;
  border-radius: 62px 0px 0px 62px;
  background: linear-gradient(#118ab2, #6dbaa2);
`;

const LeftSide = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 60%;
  text-align: left;
  padding: 60px;
  padding-top: 30px;
  padding-bottom: 33px;
`;

const Heading = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 42px;
  line-height: 63px;
  letter-spacing: 0%;
  color: ${(props) => props.textColor};
`;

const SubHeading = styled.h2`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: ${(props) => props.textColor};
`;
