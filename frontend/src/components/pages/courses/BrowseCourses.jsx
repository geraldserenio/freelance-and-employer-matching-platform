// pages/CoursesPage.js
import React from "react";
import styled from "styled-components";
import CourseCard from "./CourseCard";
import { SubHeading } from "../../shared/generic/headers";
import { Heading } from "../projects/ProjectInfo";
import { gray, primaryColor } from "../../shared/styles/color";
import { PageHeader } from "../../navigation/page-header";
import { fontFamily } from "../../shared/styles/theme";
import { useState } from "react";
import { getBrowseCoursesService } from "../../../services/courses/courses-service";
import { useEffect } from "react";

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [coursesListMeta, setCoursesListMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Ebooks");

  useEffect(() => {
    async function browse() {
      const browsed = await getBrowseCoursesService(page, category);
      setCourses(browsed.data?.result?.data);

      setCoursesListMeta(browsed?.data?.result?.meta);
    }

    browse();
  }, [page, category]);
  return (
    <div>
      <PageHeader />
      <Wrapper>
        <Header>
          <Heading style={{ color: primaryColor, marginTop: 0 }}>
            All digital content you need in one place
          </Heading>
          <p>
            Explore a variety of online courses to enhance your knowledge and
            skills.
          </p>
        </Header>

        <CategoryNav>
          <span
            className={category == "Ebooks" ? "active" : ""}
            onClick={() => setCategory("Ebooks")}
          >
            Ebooks
          </span>
          <span
            className={category == "Audio" ? "active" : ""}
            onClick={() => setCategory("Audio")}
          >
            Audio
          </span>
          <span
            className={category == "Video" ? "active" : ""}
            onClick={() => setCategory("Video")}
          >
            Video
          </span>
          <span
            className={category == "Programming" ? "active" : ""}
            onClick={() => setCategory("Programming")}
          >
            Programming
          </span>
          <span
            className={category == "Design" ? "active" : ""}
            onClick={() => setCategory("Design")}
          >
            Design
          </span>
          <span
            className={category == "Photography" ? "active" : ""}
            onClick={() => setCategory("Photography")}
          >
            Photography
          </span>
          <span
            className={category == "Business" ? "active" : ""}
            onClick={() => setCategory("Business")}
          >
            Business
          </span>
          <span
            className={category == "Writing" ? "active" : ""}
            onClick={() => setCategory("Writing")}
          >
            Writing
          </span>
        </CategoryNav>

        {courses?.length > 0 ? (
          <CardGrid>
            {courses?.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </CardGrid>
        ) : (
          <p style={{ color: gray }}>No courses</p>
        )}
      </Wrapper>
    </div>
  );
};

export default BrowseCourses;

const Wrapper = styled.div`
  padding: 40px;
  font-family: sans-serif;
`;

const Header = styled.div`
  font-family: ${fontFamily.font};
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    color: #082c5f;
  }

  p {
    color: #444;
  }
`;

const CategoryNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
  font-weight: bold;

  span {
    cursor: pointer;
    color: ${primaryColor};
    &.active {
      color: #082c5f;
      border-bottom: 2px solid #082c5f;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 0 12px;

    span {
      flex: 0 0 auto;
    }
  }
`;

const CardGrid = styled.div`
  cursor: pointer;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;
