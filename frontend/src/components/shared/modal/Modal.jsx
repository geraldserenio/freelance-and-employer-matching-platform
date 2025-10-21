import React from "react";
import styled from "styled-components";
import { primaryDarkColor } from "../styles/color";

const Modal = ({ isOpen, onClose, title, children, modalContainerWidth }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        style={{ width: modalContainerWidth }}
      >
        <ModalHeader>
          <h2>{title}</h2>
          <ModalClose onClick={onClose}>&times;</ModalClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: ${primaryDarkColor};
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding-top: 10px;
`;
