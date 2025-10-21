import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { fontFamily } from "../../shared/styles/theme";
import {
  black,
  panelBackground,
  primaryColor,
  white,
} from "../../shared/styles/color";
import { gap } from "../../shared/styles/sizes";
import { ErrorMessage, SubHeading } from "../../shared/generic/headers";
import { StyledInput } from "../../shared/inputs/LoginField";
import { useForm } from "react-hook-form";
import {
  getProjectByIdService,
  storeProjectService,
} from "../../../services/project/project-service";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/reducer/authReducer";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BackToListingButton } from "../job-listing/job-header/JobApplicationInfo";
import {
  Heading,
  Tag,
  TagContanier,
  TagLabel,
  TagsContainer,
} from "./ProjectInfo";
import LoadingScreen from "../../shared/loading/LoadingScreen";

export const AddProject = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId;
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getProject() {
      setLoading(true);
      const project = await getProjectByIdService(projectId);
      if (project?.status === 401) {
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
      } else if (role !== "business") {
        Swal.fire({
          title: "You are trying to access a restricted page",
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
        reset(project?.data.result?.data[0]);
        setLoading(false);
      }
    }
    if (projectId) {
      getProject();
    }
  }, []);

  const onSubmit = async (data) => {
    if (projectId) {
      data.id = projectId;
    }
    setLoading(true);
    const response = await storeProjectService(data);
    if (response?.status == 200) {
      setLoading(false);
      setLoginErrorMessage("");
      Swal.fire({
        title: "Successful!",
        text: `Project successfully ${projectId ? "Updated" : "Added"}`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/projects");
        }
      });
    } else {
      setLoginErrorMessage(response?.data?.message);
      if (response?.data?.message === "No token provided") {
        dispatch(logout());
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <PageHeader />
      {loading ? (
        <LoadingScreen />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container2>
            <Heading>{projectId ? "Update" : "Add"} Project</Heading>
            {loginErrorMessage && (
              <ErrorMessage>{loginErrorMessage}</ErrorMessage>
            )}
            <TagsContainer>
              <TagContanier>
                <TagLabel>Project name</TagLabel>
                <Tag>
                  <StyledInput
                    placeholder="Project name"
                    id="project_name"
                    {...register("project_name", {
                      required: "Project name is required",
                    })}
                  />
                  {errors.project_name && (
                    <ErrorMessage>{errors.project_name.message}</ErrorMessage>
                  )}
                </Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Deadline</TagLabel>
                <Tag>
                  <StyledInput
                    placeholder="Deadline"
                    id="deadline"
                    {...register("deadline")}
                  />
                </Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Payment condition</TagLabel>
                <Tag>
                  <Select
                    id="payment_condition"
                    {...register("payment_conditions")}
                  >
                    <Option value={"Weekly"}>Weekly</Option>
                    <Option value={"Bi-weekly"}>Bi-weekly</Option>
                    <Option value={"By monthly"}>By monthly</Option>
                    <Option value={"By milestone"}>By milestone</Option>
                    <Option
                      value={
                        "By project with a 30% percent downpayment and 70% upon turn over"
                      }
                    >
                      By project with a 30% percent downpayment and 70% upon
                      turn over
                    </Option>
                  </Select>
                </Tag>
              </TagContanier>
              <TagContanier>
                <TagLabel>Status</TagLabel>
                <Tag>
                  <Select id="status" {...register("status")}>
                    <Option value={"open"}>Open</Option>
                    <Option value={"in_progress"}>In progress</Option>
                    <Option value={"pending"}>Pending</Option>
                    <Option value={"completed"}>Completed</Option>
                    <Option value={"cancelled"}>Cancelled</Option>
                  </Select>
                </Tag>
              </TagContanier>
            </TagsContainer>
          </Container2>
          <JobDetails>
            <FieldSection>
              <Section>
                <SectionHeader>Project description</SectionHeader>
                <TextArea
                  placeholder="Project description"
                  id="project_description"
                  {...register("project_description", {
                    required: "Project description is required",
                  })}
                />
                {errors.project_description && (
                  <ErrorMessage>
                    {errors.project_description.message}
                  </ErrorMessage>
                )}
              </Section>
            </FieldSection>
            <ButtonSection>
              <SaveButton type="submit">Save</SaveButton>
              <BackToListingButton
                onClick={() => navigate("/projects")}
                style={{ marginTop: 0 }}
              >
                Back to projects
              </BackToListingButton>
            </ButtonSection>
          </JobDetails>
        </form>
      )}

      <Footer />
    </Container>
  );
};

const Container2 = styled.div`
  background-color: ${panelBackground};
  text-align: start;
  padding: 72px;
  padding-top: 52px;
  padding-bottom: 42px;
  border-radius: 0px 0px 40px 40px;
  margin-bottom: 20px;
`;

const Container = styled.div``;

export const Select = styled.select`
  border: 1px solid #99aebb;
  padding: ${gap + 5}px;
  border-radius: 6px;
  cursor: pointer;
  width: 295px;
`;

export const Option = styled.option`
  border: 1px solid #99aebb;
  padding: ${gap}px;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  border: 1px solid #99aebb;
  min-height: 100px;
  min-width: 570px;
  padding: ${gap}px;
  border-radius: 6px;
  font-family: ${fontFamily.font};
`;

const JobDetails = styled.div`
  padding: 80px;
  display: grid;
  gap: ${gap * 6}px;
`;

const FieldSection = styled.div`
  display: flex;
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

export const SaveButton = styled.button`
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
