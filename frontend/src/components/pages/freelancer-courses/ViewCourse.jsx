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
import { gap } from "../../shared/styles/sizes";
import { useLocation, useNavigate } from "react-router-dom";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import { getCourseByIdService } from "../../../services/courses/courses-service";
import {
  BackToListingButton,
  Heading,
  Tag,
  TagLabel,
} from "../projects/ProjectInfo";
import { SubHeading } from "../../shared/generic/headers";

export const ViewCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const [info, setInfo] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    navigate("/sign-up");
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getCourseByIdService(courseId);

      setInfo(result?.data.result?.data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      {user?.user?.user_type === "freelancers" ? (
        <FreelancerHeader />
      ) : (
        <BusinessHeader />
      )}
      <SubHeading style={{ paddingLeft: 40 }}>
        <BackToListingButton onClick={() => navigate("/freelancer-courses")}>
          Back to courses list
        </BackToListingButton>
      </SubHeading>

      <Heading style={{ textAlign: "left", paddingLeft: 40 }}>
        View Course
      </Heading>
      <JobDetails
        style={{
          paddingBottom: 30,
          paddingTop: 0,
          display: "flex",
          borderBottom: `1px solid ${gray}`,
        }}
      >
        <Section>
          <TagLabel>
            <b>Title</b>
          </TagLabel>
          <Tag>{info?.title}</Tag>
        </Section>
        <Section>
          <TagLabel>
            <b>Status</b>
          </TagLabel>
          <Tag style={{ textTransform: "capitalize" }}>
            {info?.status ?? ""}
          </Tag>
        </Section>
      </JobDetails>
      <JobDetails style={{ paddingTop: 20, backgroundColor: white }}>
        <Section style={{ textAlign: "left" }}>
          <SectionHeader>Content</SectionHeader>
          <UL>
            <div
              style={{
                padding: `${gap * 2}px`,
                borderRadius: "12px",
              }}
              dangerouslySetInnerHTML={{ __html: info?.content }}
            />
          </UL>
        </Section>
      </JobDetails>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const JobDetails = styled.div`
  padding: 80px;
  display: grid;
  gap: ${gap * 6}px;
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
