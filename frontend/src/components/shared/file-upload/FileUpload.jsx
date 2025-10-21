import React from "react";
import styled from "styled-components";
import { primaryColor } from "../styles/color";
import { fontFamily } from "../styles/theme";

const FileUpload = ({ file, handleFileChange }) => {
  return (
    <UploadContainer>
      <label style={{ cursor: "pointer" }}>
        <Input type="file" onChange={handleFileChange} />
        Upload CV
      </label>
      {file && <FileName>{file.name}</FileName>}
    </UploadContainer>
  );
};

export default FileUpload;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  background-color: #f9f9f9;
  border: 2px solid ${primaryColor};
  color:  ${primaryColor};
  font-family: ${fontFamily.font}
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const FileName = styled.p`
  color: #333;
  margin: 0;
  margin-top: 10px;
`;
