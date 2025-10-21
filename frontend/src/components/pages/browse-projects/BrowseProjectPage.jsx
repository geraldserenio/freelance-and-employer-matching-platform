// BrowseProjectsPage.jsx
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { fontFamily } from "../../shared/styles/theme";
import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { black, gray, grayBG, primaryColor } from "../../shared/styles/color";
import { Panel } from "../job-listing/filtering/Panel";
import { browseProjectService } from "../../../services/project/project-service";
import { BackToListingButton } from "../Dashboard/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { Heading } from "../projects/ProjectInfo";
import { SubHeading, SubHeadingSection } from "../../shared/generic/headers";

const BrowseProjectsPage = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [contractFilters, setContractFilters] = useState([]);
  const [experienceLevelFilters, setExperienceLevelFilters] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);
  const [salaryFilters, setSalaryFilters] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [page, setPage] = useState(1);
  const [jobProjectListMeta, setJobProjectListMeta] = useState([]);

  const [fetchFlag, setFetchFlag] = useState(false);
  const handleApplyFilters = useCallback(async (data) => {
    setPage(1);
    setFetchFlag(!fetchFlag);
    const result = await browseProjectService(page, data);
    setProjectList(result?.data?.result?.data);
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function browse() {
      const filters = {
        contract_type: contractFilters,
        experience_level: experienceLevelFilters,
        salary: salaryFilters,
        location: locationFilters,
        project_name: keyword ? [keyword] : [],
      };
      const browsed = await browseProjectService(page, filters);
      setProjectList([...projectList, ...browsed.data?.result?.data]);

      setJobProjectListMeta(browsed?.data?.result?.meta);
    }

    browse();
  }, [page, fetchFlag]);

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    const filters = {
      contract_type: contractFilters,
      experience_level: experienceLevelFilters,
      salary: salaryFilters,
      location: locationFilters,
      project_name: keyword ? [keyword] : [],
    };
    const browsed = await browseProjectService(page, filters);
    setProjectList(browsed?.data?.result?.data);
  };

  const handleViewProject = (data) => {
    navigate("/view-project", {
      state: { projectId: data?.id, viaProjectBrowsing: true },
    });
  };

  return (
    <div>
      <PageHeader />
      <Container>
        <Heading style={{ margin: 0, textAlign: "left" }}>
          Discover Projects
        </Heading>
        <SubHeadingSection style={{ color: black, textAlign: "left" }}>
          From web development to copywriting, find your next opportunity.
        </SubHeadingSection>

        <SearchBarContainer>
          <SearchInput
            placeholder="e.g. Web-design"
            onChange={handleSearchChange}
            value={keyword}
          />
          <SearchButton
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </SearchButton>
        </SearchBarContainer>

        <FiltersToggle onClick={() => setShowFilters(!showFilters)}>
          More Filters<Arrow open={showFilters}>▶</Arrow>
        </FiltersToggle>

        {showFilters && (
          <div style={{ marginBottom: "1rem" }}>
            <Panel
              keywords={keyword}
              handleApplyFilters={handleApplyFilters}
              contractFilters={contractFilters}
              setContractFilters={setContractFilters}
              experienceLevelFilters={experienceLevelFilters}
              setExperienceLevelFilters={setExperienceLevelFilters}
              locationFilters={locationFilters}
              setLocationFilters={setLocationFilters}
              salaryFilters={salaryFilters}
              setSalaryFilters={setSalaryFilters}
            />
          </div>
        )}

        <FeaturedCard>
          <img
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt="Client"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <ProjectInfo>
            <ProjectTitle>Digital Marketing Campaign</ProjectTitle>
            <ProjectClient>For InnovateX</ProjectClient>
            <Budget>$500 – $800 USD · Remote</Budget>
          </ProjectInfo>
        </FeaturedCard>

        <ProjectList>
          {projectList?.map((data, index) => (
            <ProjectItem
              style={{
                cursor:
                  data?.businessUser?.id == loggedInUser?.user?.id
                    ? "not-allowed"
                    : "pointer",
              }}
              key={index}
              onClick={
                data?.businessUser?.id == loggedInUser?.user?.id
                  ? () => {}
                  : () => handleViewProject(data)
              }
            >
              <ProjectMeta>
                <ProjectRow>{data?.project_name}</ProjectRow>
                <ProjectRow
                  style={{
                    color: gray,
                    filter: `blur(${loggedInUser ? 0 : 5}px)`,
                  }}
                >
                  {data?.businessUser?.first_name}
                </ProjectRow>
              </ProjectMeta>
              <ProjectRow
                style={{
                  color: gray,
                  display: "flex",
                  alignItems: "center",
                  filter: `blur(${loggedInUser ? 0 : 6}px)`,
                }}
              >
                {data?.salary} · {data?.location}
              </ProjectRow>
            </ProjectItem>
          ))}
        </ProjectList>
        <BackToListingButton
          disabled={
            projectList?.length < jobProjectListMeta?.total ? false : true
          }
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
            setFetchFlag(!fetchFlag);
          }}
          style={{
            opacity: projectList?.length < jobProjectListMeta?.total ? 1 : 0.5,
            cursor:
              projectList?.length < jobProjectListMeta?.total
                ? "pointer"
                : "not-allowed",
          }}
        >
          Load more
        </BackToListingButton>
      </Container>
      <Footer />
    </div>
  );
};

export default BrowseProjectsPage;

const Container = styled.div`
  padding: 2rem;
  font-family: ${fontFamily.font};
  margin: auto;
  background-color: ${grayBG};
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.25rem;
  color: ${primaryColor};
`;

const SubHeader = styled.p`
  color: #555;
  margin-bottom: 2rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 18px 0px 0px 18px;
`;

const SearchButton = styled.button`
  background-color: ${primaryColor};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0px 18px 18px 0px;
  cursor: pointer;
`;

const FiltersToggle = styled.button`
  font-family: ${fontFamily.font};
  background: none;
  border: none;
  color: ${black};
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Arrow = styled.span`
  display: inline-block;
  transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  color: ${gray};
`;

const FeaturedCard = styled.div`
  background: #e9f4ff;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProjectInfo = styled.div``;

const ProjectTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const ProjectClient = styled.p`
  margin: 0;
  font-weight: 500;
  color: #666;
`;

const Budget = styled.p`
  margin: 0;
  color: ${primaryColor};
  font-weight: bold;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 350px;
  overflow: auto;
`;

const ProjectItem = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  background: #fff;
  cursor: pointer;
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectRow = styled.p`
  margin: 0.25rem 0;
  color: #333;
`;
