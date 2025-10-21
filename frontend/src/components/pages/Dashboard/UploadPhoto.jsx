import { useState, useEffect } from "react";
import styled from "styled-components";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { BASE_URL } from "../../../helper/base-url";

export default function UploadPhoto({
  photo,
  handleImageChange,
  image,
  setImage,
  handleChange,
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (photo && photo !== "") {
      setImage(`${BASE_URL}uploads/${photo}`);
    }
  }, [photo]);

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => document.getElementById("fileInput").click()}
    >
      <input
        id="fileInput"
        name="uploadedPhoto"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
        handleChange={handleChange}
      />
      {image ? (
        <img
          src={image}
          alt="Selected"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Placeholder>
          <Icon
            style={{ height: "100%", width: "100%" }}
            src={generateIcon("UploadProfilePicture")}
          />
        </Placeholder>
      )}
      {hovered && <Overlay>✔</Overlay>}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 256px;
  height: 256px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const UploadButton = styled.button`
  margin-top: 8px;
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;
