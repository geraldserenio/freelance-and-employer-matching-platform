import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import {
  black,
  gray,
  panelBackground,
  primaryColor,
  primaryDarkColor,
  white,
} from "../../shared/styles/color";
import { fontFamily } from "../../shared/styles/theme";
import { StyledInput } from "../../shared/inputs/LoginField";
import UploadPhoto from "./UploadPhoto";

export const ProfileInfo = (props) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const {
    first_name,
    middle_name,
    last_name,
    email,
    address,
    mobile,
    photo,
    isEditting,
    handleImageChange,
    image,
    setImage,
    handleChange,
    company_website,
    company_type,
    company_size,
  } = props;

  return (
    <Container>
      {user?.user?.user_type === "freelancers" ? (
        <Container style={{ width: "100%", padding: 0 }}>
          {" "}
          <div style={{ width: "100%", padding: 0 }}>
            {" "}
            <Heading>
              {isEditting ? (
                <NameContainer>
                  <div style={{ width: "100%", padding: 0 }}>
                    <TagLabel>
                      First name<RequiredIndication> *</RequiredIndication>
                    </TagLabel>
                    <StyledInput
                      value={first_name}
                      onChange={handleChange}
                      name={"first_name"}
                    />
                  </div>
                  <div>
                    <TagLabel>Middle name</TagLabel>
                    <StyledInput
                      value={middle_name}
                      onChange={handleChange}
                      name={"middle_name"}
                    />
                  </div>
                  <div>
                    <TagLabel>
                      Last name<RequiredIndication> *</RequiredIndication>
                    </TagLabel>
                    <StyledInput
                      value={last_name}
                      name={"last_name"}
                      onChange={handleChange}
                    />
                  </div>
                </NameContainer>
              ) : (
                <NameContainer>{`${first_name || ""} ${middle_name ?? ""} ${last_name || ""}`}</NameContainer>
              )}
            </Heading>
            <AddressAndEmailContainer>
              <TagContanier>
                <TagLabel>Address</TagLabel>
                <Tag>
                  {isEditting ? (
                    <StyledInput
                      value={address}
                      name={"address"}
                      onChange={handleChange}
                    />
                  ) : (
                    (address ?? "")
                  )}
                </Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Email</TagLabel>
                <Tag>
                  {isEditting ? (
                    <StyledInput
                      value={email}
                      disabled
                      name={"email"}
                      onChange={handleChange}
                    />
                  ) : (
                    (email ?? "")
                  )}
                </Tag>
              </TagContanier>
            </AddressAndEmailContainer>
          </div>
          <PhotoContainer>
            <UploadPhoto
              photo={photo}
              handleImageChange={handleImageChange}
              image={image}
              setImage={setImage}
            />

            <TagContanier>
              <TagLabel>
                Mobile<RequiredIndication> *</RequiredIndication>
              </TagLabel>
              <Tag>
                {isEditting ? (
                  <StyledInput
                    value={mobile}
                    name={"mobile"}
                    onChange={handleChange}
                  />
                ) : (
                  (mobile ?? "")
                )}
              </Tag>
            </TagContanier>
          </PhotoContainer>
        </Container>
      ) : (
        <Container style={{ width: "100%", padding: 0 }}>
          {" "}
          <div style={{ width: "100%" }}>
            {" "}
            <Heading
              style={{ backgroundColor: "transparent", border: 0, padding: 0 }}
            >
              <NameContainer>
                <div style={{ width: "100%" }}>
                  <TagLabel>
                    Business / Name<RequiredIndication> *</RequiredIndication>
                  </TagLabel>
                  <StyledInput
                    value={first_name}
                    onChange={handleChange}
                    name={"first_name"}
                  />
                </div>
              </NameContainer>
            </Heading>
            <AddressAndEmailContainer
              style={{
                backgroundColor: "transparent",
                border: 0,
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <TagContanier style={{ width: "100%" }}>
                <TagLabel>Email</TagLabel>
                <Tag>
                  <StyledInput
                    value={email}
                    disabled
                    name={"email"}
                    onChange={handleChange}
                  />
                </Tag>
              </TagContanier>
              <TagContanier style={{ width: "100%" }}>
                <TagLabel>Company Website</TagLabel>
                <Tag>
                  <StyledInput
                    value={company_website}
                    name={"company_website"}
                    onChange={handleChange}
                  />
                </Tag>
              </TagContanier>
            </AddressAndEmailContainer>
          </div>
          <PhotoContainer>
            <UploadPhoto
              photo={photo}
              handleImageChange={handleImageChange}
              image={image}
              setImage={setImage}
            />
          </PhotoContainer>
        </Container>
      )}
    </Container>
  );
};

const PhotoContainer = styled.div`
  border: 1px solid ${gray};
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${white};
  border-radius: ${gap}px;
  gap: ${gap}px;
  display: grid;
`;

export const NameContainer = styled.div`
  display: flex;
  gap: ${gap}px;

  width: 100%;
`;

export const AddressAndEmailContainer = styled.div`
  display: grid;
  justify-content: start;
  gap: ${gap}px;
  border-radius: ${gap}px;

  height: 47%;

  border: 1px solid ${gray};
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${white};

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    justify-content: start;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const TagsContainer = styled.div`
  display: grid;
  justify-content: start;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    justify-content: start;
    gap: ${gap}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const TagContanier = styled.div`
  display: grid;
  gap: ${gap + 2}px;
`;

export const RequiredIndication = styled.span`
  color: red;
`;

export const TagLabel = styled.label`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
  color: ${black};
`;

export const Tag = styled.label`
  font-family: ${fontFamily.f};
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
  color: ${primaryDarkColor};
`;

const Container = styled.div`
  background-color: ${panelBackground};
  text-align: start;
  padding: 72px;
  padding-top: 32px;
  padding-bottom: 17px;
  display: flex;
  justify-content: space-between;
  gap: ${gap}px;
`;

const Heading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -2%;
  color: ${primaryDarkColor};
  display: flex;
  border: 1px solid ${gray};
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${white};
  border-radius: ${gap}px;
  height: 50%;

  gap: ${gap}px;
  justify-content: space-between;
  align-items: center;
  display: grid;
  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
  margin-top: 0px !important;
  margin-bottom: 10px !important;
`;

const SubHeading = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 42px;
  line-height: 50.4px;
  color: ${white};
  margin-bottom: 0;
`;

export const BackToListingButton = styled.button`
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
  margin-top: ${gap * 3}px;
`;
