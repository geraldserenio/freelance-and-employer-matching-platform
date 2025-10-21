import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageHeader } from "../../../navigation/page-header";
import {
  black,
  panelBackground,
  primaryColor,
  white,
} from "../../../shared/styles/color";
import { fontFamily } from "../../../shared/styles/theme";
import {
  desktopDevice,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import { Footer } from "../../../navigation/footer/Footer";
import { BackToListingButton } from "../ProfileInfo";
import { ErrorMessage } from "../../../shared/generic/headers";
import {
  Heading,
  Tag,
  TagContanier,
  TagLabel,
  TagsContainer,
} from "../../projects/ProjectInfo";
import { StyledInput } from "../../../shared/inputs/LoginField";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logout } from "../../../../redux/reducer/authReducer";
import Swal from "sweetalert2";
import { getAllOfProjectsByBusinessIdForDropdown } from "../../../../services/project/project-service";
import {
  getJobListingByIdService,
  postJobsService,
} from "../../../../services/job-listings/job-listings-services";
import { BusinessHeader } from "../../../navigation/page-header/BusinessHeader";
import { ButtonSpinner } from "../../../shared/loading/LoadingScreen";

export const CreateJobListing = () => {
  const [projectList, setProjectList] = useState([]);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [isExternal, setIsExternal] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getJob() {
      const result = await getJobListingByIdService(jobId, loggedInUser?.token);
      if (result?.status === 401) {
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
      } else {
        reset(result?.data.result?.data[0]);
      }
    }
    if (jobId) {
      getJob();
    }

    async function fetchProject() {
      const projects = await getAllOfProjectsByBusinessIdForDropdown(
        loggedInUser?.user?.id,
        loggedInUser?.token,
      );
      if (projects?.status === 401) {
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
      } else {
        setProjectList(projects?.data?.result);
      }
    }

    fetchProject();
  }, []);

  const onSubmit = async (data) => {
    if (jobId) {
      data.id = jobId;
    }
    data.is_external = isExternal;
    data.exclusive = isExclusive;

    setLoading(true);

    const response = await postJobsService(data);
    if (response?.status == 200) {
      setLoginErrorMessage("");
      Swal.fire({
        title: "Successful!",
        text: `Job successfully ${jobId ? "Updated" : "Posted"}`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/jobs");
        }
      });
    } else {
      setLoginErrorMessage(response?.data?.message);
      if (response?.data?.message === "No token provided") {
        dispatch(logout());
      }
    }
  };

  const handleChangeIsExternal = (event) => {
    setIsExternal(event.target.checked);
  };

  const handleChangeIsExclusive = (event) => {
    setIsExclusive(event.target.checked);
  };

  return (
    <Container>
      <BusinessHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container2>
          <Heading>{jobId ? "Update" : "Post"} a job</Heading>
          {loginErrorMessage && (
            <ErrorMessage>{loginErrorMessage}</ErrorMessage>
          )}
          <TagsContainer>
            <TagContanier>
              <TagLabel>Job title</TagLabel>
              <Tag>
                <StyledInput
                  placeholder="Job title"
                  id="project_name"
                  {...register("job_title", {
                    required: "Job title is required",
                  })}
                />
                {errors.job_title && (
                  <ErrorMessage>{errors.job_title.message}</ErrorMessage>
                )}
              </Tag>
            </TagContanier>
            <TagContanier>
              <TagLabel>Location</TagLabel>
              <Tag>
                <StyledInput
                  placeholder="Location"
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <ErrorMessage>{errors.location.message}</ErrorMessage>
                )}
              </Tag>
            </TagContanier>
            <TagContanier>
              <TagLabel>Salary</TagLabel>
              <Tag>
                <StyledInput
                  placeholder="salary"
                  id="salary"
                  {...register("salary", {
                    required: "Salary is required",
                  })}
                />
                {errors.salary && (
                  <ErrorMessage>{errors.salary.message}</ErrorMessage>
                )}
              </Tag>
            </TagContanier>
            <TagContanier>
              <TagLabel>
                External
                <StyledInput
                  placeholder="is_external"
                  type="checkbox"
                  id="is_external"
                  name="is_external"
                  onChange={handleChangeIsExternal}
                />
              </TagLabel>
              <Tag>
                <StyledInput
                  placeholder="External link"
                  id="external_link"
                  {...register("external_link")}
                  disabled={!isExternal}
                />
              </Tag>
            </TagContanier>
          </TagsContainer>
          <TagsContainer>
            <TagContanier>
              <TagLabel>Contract type</TagLabel>
              <Tag>
                <Select id="contract_type" {...register("contract_type")}>
                  <Option value={"Full-time"}>Full-time</Option>
                  <Option value={"Part-time"}>Part-time</Option>
                  <Option value={"Freelance"}>Freelance</Option>
                  <Option value={"Contractual"}>Contractual</Option>
                </Select>
              </Tag>
            </TagContanier>
            <TagContanier>
              <TagLabel>Experience level</TagLabel>
              <Tag>
                <Select id="experience_level" {...register("experience_level")}>
                  <Option value={"Entry level"}>Entry level</Option>
                  <Option value={"Mid level"}>Mid level</Option>
                  <Option value={"Senior level"}>Senior level</Option>
                  <Option value={"Lead"}>Lead</Option>
                  <Option value={"Managerial"}>Managerial</Option>
                </Select>
              </Tag>
            </TagContanier>
            <TagContanier>
              <TagLabel>Work setup</TagLabel>
              <Tag>
                <Select id="work_setup" {...register("work_setup")}>
                  <Option value={"remote"}>Remote</Option>
                  <Option value={"hybrid"}>Hybrid</Option>
                  <Option value={"on-site"}>Onsite</Option>
                </Select>
              </Tag>
            </TagContanier>
            <TagContanier>
              <TagLabel>Project</TagLabel>
              <Tag>
                <Select
                  id="project_id"
                  {...register("project_id", {
                    required: "Project is required",
                  })}
                >
                  <Option value={""}></Option>
                  {projectList?.data?.map((data, index) => {
                    return (
                      <Option value={data?.id} key={index}>
                        {data?.project_name}
                      </Option>
                    );
                  })}
                </Select>

                {errors.project_id && (
                  <ErrorMessage>{errors.project_id.message}</ErrorMessage>
                )}
              </Tag>
            </TagContanier>
          </TagsContainer>
          <TagsContainer>
            {loggedInUser?.user?.user_type == "admin" && (
              <TagLabel>
                Exclusive
                <StyledInput
                  placeholder="is_external"
                  type="checkbox"
                  id="is_external"
                  onChange={handleChangeIsExclusive}
                />
              </TagLabel>
            )}

            {jobId && (
              <TagContanier>
                <TagLabel>Status</TagLabel>
                <Tag>
                  <Select id="status" {...register("status")}>
                    <Option value={"open"}>Open</Option>
                    <Option value={"in_progress"}>In progress</Option>
                    <Option value={"completed"}>Completed</Option>
                    <Option value={"closed"}>Closed</Option>
                  </Select>
                </Tag>
              </TagContanier>
            )}
          </TagsContainer>
        </Container2>
        <JobDetails>
          <FieldSection>
            <Section>
              <SectionHeader>Qualification</SectionHeader>
              <TextArea
                placeholder="Qualification"
                id="qualification"
                {...register("qualification", {
                  required: "Qualification is required",
                })}
              />
              {errors.qualification && (
                <ErrorMessage>{errors.qualification.message}</ErrorMessage>
              )}
            </Section>
            <Section>
              <SectionHeader>Responsibilities</SectionHeader>
              <TextArea
                placeholder="responsibilities"
                id="responsibilities"
                {...register("responsibilities", {
                  required: "Responsibilities is required",
                })}
              />
              {errors.responsibilities && (
                <ErrorMessage>{errors.responsibilities.message}</ErrorMessage>
              )}
            </Section>
          </FieldSection>
          <ButtonSection>
            <SaveButton type="submit">
              {loading ? <ButtonSpinner /> : "Save"}
            </SaveButton>
            <BackToListingButton
              onClick={() => navigate("/jobs")}
              style={{ marginTop: 0 }}
            >
              Back to jobs
            </BackToListingButton>
          </ButtonSection>
        </JobDetails>
      </form>
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
  display: grid;
  gap: ${gap}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
  }
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
