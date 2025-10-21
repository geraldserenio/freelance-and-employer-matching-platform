import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer } from "../../navigation/footer/Footer";
import { fontFamily } from "../../shared/styles/theme";
import {
  black,
  gray,
  panelBackground,
  primaryColor,
  white,
} from "../../shared/styles/color";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import {
  BackToListingButton,
  ProfileInfo,
  RequiredIndication,
  Tag,
  TagContanier,
  TagLabel,
} from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import { Option, SaveButton, Select, TextArea } from "../projects/AddProject";
import {
  getUserById,
  updateProfile,
} from "../../../services/users/user-services";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/reducer/authReducer";
import { StyledInput } from "../../shared/inputs/LoginField";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import StripeOnboard from "../admin/users/project-payments/onboard-freelancer/StripeOnboard";

export const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [passwordInfo, setPasswordInfo] = useState({
    new_password: "",
    confirm_password: "",
  });
  const user = JSON.parse(localStorage.getItem("userData"));
  const [isEditting, setIsEditting] = useState(false);
  const [image, setImage] = useState(userInfo?.photo || null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([""]);
  const [experience, setExperience] = useState([""]);

  if (!user) {
    navigate("/sign-up");
  }

  useEffect(() => {
    async function fetchData() {
      const userInfoResult = await getUserById(user?.user?.id);
      setUserInfo(userInfoResult?.data?.result?.data);
      const skillNames = userInfoResult?.data?.result?.data?.skills?.map(
        (skill) => skill.skill_name,
      );
      const experiencesNames =
        userInfoResult?.data?.result?.data?.experiences?.map(
          (skill) => skill.experience_name,
        );
      setSkills(skillNames);
      setExperience(experiencesNames);
    }
    fetchData();
  }, []);

  const updateCodeAtIndex = (index, newCode) => {
    setSkills((prevCodes) => {
      const updated = [...prevCodes];
      updated[index] = newCode;
      return updated;
    });
  };

  const updateExperienceAtIndex = (index, newCode) => {
    setExperience((prevCodes) => {
      const updated = [...prevCodes];
      updated[index] = newCode;
      return updated;
    });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile); // Store the file for backend upload
      setIsEditting(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value, // Store file or text
    }));
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value, // Store file or text
    }));
  };

  const handleSaveEditedInfo = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("id", userInfo?.id);
    formPayload.append("about", userInfo?.about);
    formPayload.append("company_website", userInfo?.company_website);
    formPayload.append("company_size", userInfo?.company_size);
    formPayload.append("company_type", userInfo?.company_type);
    formPayload.append("first_name", userInfo?.first_name);
    formPayload.append("middle_name", userInfo?.middle_name);
    formPayload.append("last_name", userInfo?.last_name);
    formPayload.append("mobile", userInfo?.mobile);
    formPayload.append("address", userInfo?.address);
    formPayload.append("email", userInfo?.email);
    formPayload.append("skills", JSON.stringify(skills));
    formPayload.append("experience", JSON.stringify(experience));
    if (passwordInfo?.new_password || passwordInfo?.confirm_password) {
      formPayload.append("new_password", passwordInfo?.new_password);
      formPayload.append("confirm_password", passwordInfo?.confirm_password);
    }

    if (file) {
      formPayload.append("uploadedPhoto", file);
    }
    const user = await updateProfile(formPayload);

    if (user?.status === 401) {
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
    } else if (user?.status === 400) {
      Swal.fire({
        title: `${user?.data?.title}`,
        text: `${user?.data?.message}`,
        icon: "warning",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {});
    } else {
      Swal.fire({
        title: "Profile Updated.",
        text: "Click OK, to go back to dashboard",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    }
  };

  const handleAddButton = (newSkill) => {
    setSkills((prevCodes) => [...prevCodes, newSkill]);
  };

  const handleAddExperienceButton = (newSkill) => {
    setExperience((prevCodes) => [...prevCodes, newSkill]);
  };

  const removeExperienceAtIndex = (removeIndex) => {
    const updated = experience.filter((_, index) => index !== removeIndex);
    setExperience(updated); // Assuming you're using useState
  };

  const removeSkillAtIndex = (removeIndex) => {
    const updated = skills.filter((_, index) => index !== removeIndex);
    setSkills(updated); // Assuming you're using useState
  };

  return (
    <Container>
      {user?.user?.user_type === "freelancers" ? (
        <>
          <FreelancerHeader />
          <ProfileInfo
            handleChange={handleChange}
            {...userInfo}
            isEditting={isEditting}
            handleImageChange={handleImageChange}
            image={image}
            setImage={setImage}
          />
          <JobDetails>
            {isEditting && (
              <EditingWithPassword>
                <SkillsAndExperience>
                  <Skills>
                    <SectionHeader>
                      Skills<RequiredIndication> *</RequiredIndication>
                    </SectionHeader>
                    <div style={{ display: "block", width: "100%" }}>
                      {skills?.map((data, index) => {
                        return (
                          <div style={{ display: "flex", gap: gap }}>
                            <StyledInput
                              style={{ marginTop: "10px" }}
                              name="skill"
                              onChange={(e) =>
                                updateCodeAtIndex(index, e.target.value)
                              }
                              value={data}
                              maxLength={20}
                            />
                            {index > 0 && (
                              <MinusButton
                                style={{ marginTop: "10px" }}
                                onClick={() => removeSkillAtIndex(index)}
                              >
                                -
                              </MinusButton>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <AddButton
                        style={{ marginTop: "10px" }}
                        onClick={() => handleAddButton("")}
                      >
                        +
                      </AddButton>
                    </div>
                  </Skills>
                  <Experiences>
                    <SectionHeader>
                      Experiences<RequiredIndication> *</RequiredIndication>
                    </SectionHeader>
                    <div style={{ display: "block", width: "100%" }}>
                      {experience?.map((data, index) => {
                        return (
                          <div style={{ display: "flex", gap: gap }}>
                            <StyledInput
                              style={{ marginTop: "10px" }}
                              name="experience"
                              maxLength={20}
                              value={data}
                              onChange={(e) =>
                                updateExperienceAtIndex(index, e.target.value)
                              }
                            />
                            {index > 0 && (
                              <MinusButton
                                style={{ marginTop: "10px" }}
                                onClick={() => removeExperienceAtIndex(index)}
                              >
                                -
                              </MinusButton>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <AddButton
                        style={{ marginTop: "10px" }}
                        onClick={() => handleAddExperienceButton("")}
                      >
                        +
                      </AddButton>
                    </div>
                  </Experiences>

                  <UL>
                    <SectionHeader>
                      About<RequiredIndication> *</RequiredIndication>
                    </SectionHeader>
                    <LI>
                      {isEditting ? (
                        <TextAreas
                          name="about"
                          value={userInfo?.about}
                          onChange={handleChange}
                        />
                      ) : (
                        userInfo?.about
                      )}
                    </LI>
                  </UL>
                </SkillsAndExperience>
                <PasswordContainer>
                  <SectionHeader>New password</SectionHeader>
                  <UL>
                    <LI>
                      <StyledInput
                        name="new_password"
                        maxLength={20}
                        onChange={handleChangePassword}
                        type="password"
                      />
                    </LI>
                  </UL>
                  <SectionHeader>Confirm password</SectionHeader>
                  <UL>
                    <LI>
                      <StyledInput
                        maxLength={20}
                        name="confirm_password"
                        onChange={handleChangePassword}
                        type="password"
                      />
                    </LI>
                  </UL>
                </PasswordContainer>
              </EditingWithPassword>
            )}

            {!isEditting && (
              <Section>
                <SkillsAndExperience>
                  <Skills>
                    <SectionHeader>Skills</SectionHeader>
                    <div style={{ display: "block", width: "100%" }}>
                      {userInfo?.skills?.map((data, index) => {
                        return (
                          <div style={{ display: "flex", gap: gap }}>
                            <LI>{data?.skill_name}</LI>
                          </div>
                        );
                      })}
                    </div>
                  </Skills>
                  <Experiences>
                    <SectionHeader>Experiences</SectionHeader>
                    <div style={{ display: "block", width: "100%" }}>
                      {userInfo?.experiences?.map((data, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              gap: gap,
                              justifyContent: "end",
                            }}
                          >
                            <LI>{data?.experience_name}</LI>
                          </div>
                        );
                      })}
                    </div>
                  </Experiences>
                </SkillsAndExperience>
                <AboutSection>
                  <SectionHeader>About</SectionHeader>
                  <UL>
                    <LI>
                      {isEditting ? (
                        <TextAreas
                          name="about"
                          value={userInfo?.about}
                          onChange={handleChange}
                        />
                      ) : (
                        userInfo?.about
                      )}
                    </LI>
                  </UL>
                </AboutSection>
                <StripeOnboard freelancer_id={userInfo?.id} />
              </Section>
            )}

            <ButtonSection>
              {isEditting ? (
                <SubmitContainer>
                  {" "}
                  <SaveButton
                    type="button"
                    onClick={(e) => {
                      handleSaveEditedInfo(e);
                    }}
                  >
                    Save
                  </SaveButton>
                  <BackToListingButton
                    type="button"
                    style={{ marginTop: 0 }}
                    onClick={() => {
                      setIsEditting(false);
                    }}
                  >
                    Cancel
                  </BackToListingButton>
                </SubmitContainer>
              ) : (
                <SaveButton
                  type="button"
                  onClick={() => {
                    setIsEditting(true);
                  }}
                >
                  Edit
                </SaveButton>
              )}
            </ButtonSection>
          </JobDetails>
        </>
      ) : (
        <>
          <BusinessHeader />
          <>
            <ProfileInfo
              handleChange={handleChange}
              {...userInfo}
              isEditting={isEditting}
              handleImageChange={handleImageChange}
              image={image}
              setImage={setImage}
            />
            <JobDetails>
              <EditingWithPassword>
                <OtherFieldsInCompany>
                  {" "}
                  <TagContanier style={{ width: "100%" }}>
                    <TagLabel>
                      Mobile<RequiredIndication> *</RequiredIndication>
                    </TagLabel>
                    <Tag>
                      <StyledInput
                        value={userInfo?.mobile}
                        name={"mobile"}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      />
                    </Tag>
                  </TagContanier>
                  <TagContanier style={{ width: "100%" }}>
                    <TagLabel>Company Type</TagLabel>
                    <Tag>
                      <StyledInput
                        value={userInfo?.company_type}
                        name={"company_type"}
                        onChange={handleChange}
                      />
                    </Tag>
                  </TagContanier>
                </OtherFieldsInCompany>
                <OtherFieldsInCompany>
                  {" "}
                  <TagContanier style={{ width: "100%" }}>
                    <TagLabel>Company Size</TagLabel>
                    <Tag>
                      <Select
                        style={{ width: "100%" }}
                        name={"company_size"}
                        value={userInfo?.company_size}
                        onChange={handleChange}
                      >
                        <Option value="0-50">0-50</Option>

                        <Option value="50-250">50-250</Option>
                        <Option value="250++">250+</Option>
                      </Select>
                    </Tag>
                  </TagContanier>
                  <TagContanier style={{ width: "100%" }}>
                    <TagLabel>Address</TagLabel>
                    <Tag>
                      <StyledInput
                        value={userInfo?.address}
                        name={"address"}
                        onChange={handleChange}
                      />
                    </Tag>
                  </TagContanier>
                </OtherFieldsInCompany>
                <OtherFieldsInCompany>
                  <TagContanier style={{ width: "100%" }}>
                    <TagLabel>
                      About the business
                      <RequiredIndication> *</RequiredIndication>
                    </TagLabel>
                    <Tag>
                      <StyledInput
                        name="about"
                        value={userInfo?.about}
                        onChange={handleChange}
                      />
                    </Tag>
                  </TagContanier>
                </OtherFieldsInCompany>
                <PasswordContainer style={{ backgroundColor: "transparent" }}>
                  <SectionHeader>New password</SectionHeader>
                  <UL>
                    <LI>
                      <StyledInput
                        name="new_password"
                        maxLength={20}
                        onChange={handleChangePassword}
                        type="password"
                      />
                    </LI>
                  </UL>
                  <SectionHeader>Confirm password</SectionHeader>
                  <UL>
                    <LI>
                      <StyledInput
                        maxLength={20}
                        name="confirm_password"
                        onChange={handleChangePassword}
                        type="password"
                      />
                    </LI>
                  </UL>
                </PasswordContainer>
              </EditingWithPassword>

              <ButtonSection>
                <SubmitContainer>
                  {" "}
                  <SaveButton
                    type="button"
                    onClick={(e) => {
                      handleSaveEditedInfo(e);
                    }}
                  >
                    Save
                  </SaveButton>
                  <BackToListingButton
                    type="button"
                    style={{ marginTop: 0 }}
                    onClick={() => {
                      setIsEditting(false);
                    }}
                  >
                    Cancel
                  </BackToListingButton>
                </SubmitContainer>
              </ButtonSection>
            </JobDetails>
          </>
        </>
      )}

      <Footer />
    </Container>
  );
};

const OtherFieldsInCompany = styled.div`
  text-align: start;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: ${gap}px;
`;

const PasswordContainer = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${white};
  border-radius: ${gap}px;
  width: 100%;
  text-align: start;
`;

const SkillsAndExperience = styled.div`
  display: grid;
  gap: ${gap}px;
  width: 100%;
  justify-content: space-between;
  border: 1px solid ${gray};
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${white};
  border-radius: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
`;

const Skills = styled.div`
  display: block;
  gap: ${gap}px;
`;

const Experiences = styled.div`
  display: block;
  gap: ${gap}px;
`;

const AddButton = styled.button`
  background-color: ${primaryColor};
  color: ${white};
  padding: ${gap * 2}px;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
`;

const MinusButton = styled.button`
  background-color: #ff4d4d;
  color: ${white};
  padding: ${gap * 2}px;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
`;

const Container = styled.div``;

const SubmitContainer = styled.div`
  display: flex;
  gap: ${gap}px;
`;

const JobDetails = styled.div`
  padding: 71px;

  padding-top: 0px;
  display: grid;
  gap: ${gap * 6}px;

  background-color: ${panelBackground};
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
  align-items: flex-start;
  gap: 24px;
`;

const EditingWithPassword = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
`;

const AboutSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  border: 1px solid ${gray};
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${white};
  border-radius: ${gap}px;
  height: 100%;
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

const TextAreas = styled.textarea`
  border: 1px solid #99aebb;
  min-height: 100px;
  min-width: 250px;
  padding: ${gap}px;
  border-radius: 6px;
  font-family: ${fontFamily.font};
  @media (min-width: ${tabletDevice}px) {
    min-width: 270px;
  }

  @media (min-width: ${desktopDevice}px) {
    min-width: 570px;
  }

  @media (min-width: ${largeScreens}px) {
    min-width: 570px;
  }
`;

const SkillsAndExperienceContainer = styled.div`
  display: grid;
  width: 100%;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    width: 100%;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
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
