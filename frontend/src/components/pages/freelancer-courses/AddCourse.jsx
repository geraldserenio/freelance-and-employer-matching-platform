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
import { ErrorMessage } from "../../shared/generic/headers";
import { StyledInput } from "../../shared/inputs/LoginField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/reducer/authReducer";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BackToListingButton } from "../job-listing/job-header/JobApplicationInfo";

import LoadingScreen from "../../shared/loading/LoadingScreen";
import {
  Heading,
  Tag,
  TagContanier,
  TagLabel,
  TagsContainer,
} from "../projects/ProjectInfo";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getCourseByIdService,
  storeCourseService,
} from "../../../services/courses/courses-service";

export const AddCourse = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.user_type;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getCourse() {
      setLoading(true);
      const project = await getCourseByIdService(courseId);
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
      } else {
        reset(project?.data.result?.data);
        setValue(project?.data.result?.data.content);
        setLoading(false);
      }
    }
    if (courseId) {
      getCourse();
    }
  }, []);

  const onSubmit = async (data) => {
    if (courseId) {
      data.id = courseId;
    }
    data.content = value;
    setLoading(true);
    const response = await storeCourseService(data);
    if (response?.status == 200) {
      setLoading(false);
      setLoginErrorMessage("");
      Swal.fire({
        title: "Successful!",
        text: `Course successfully ${courseId ? "Updated" : "Added"}`,
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/freelancer-courses");
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }], // ← this adds left/center/right/justify
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Container>
      <PageHeader />
      {loading ? (
        <LoadingScreen />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container2>
            <Heading>{courseId ? "Update" : "Create"} Course</Heading>
            {loginErrorMessage && (
              <ErrorMessage>{loginErrorMessage}</ErrorMessage>
            )}
            <TagsContainer>
              <TagContanier>
                <TagLabel>Title</TagLabel>
                <Tag>
                  <StyledInput
                    placeholder="Title"
                    id="title"
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                  {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                  )}
                </Tag>
              </TagContanier>

              <TagContanier>
                <TagLabel>Status</TagLabel>
                <Tag>
                  <Select id="status" {...register("status")}>
                    <Option value={"created"}>Created</Option>
                    <Option value={"pending"}>Request to be published</Option>
                  </Select>
                </Tag>
              </TagContanier>
            </TagsContainer>
          </Container2>
          <JobDetails>
            <FieldSection>
              <Section>
                <SectionHeader>Content</SectionHeader>

                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  style={{ width: "600px", height: "400px", margin: "0 auto" }}
                />
              </Section>
              {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
            </FieldSection>
            <ButtonSection>
              <SaveButton type="submit">Save</SaveButton>
              <BackToListingButton
                onClick={() => navigate("/freelancer-courses")}
                style={{ marginTop: 0 }}
              >
                Back to courses
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
  padding-top: 0;
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
