// BrowseProjectsPage.jsx
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { fontFamily } from "../../shared/styles/theme";
import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { black, gray, primaryColor } from "../../shared/styles/color";
import { gap } from "../../shared/styles/sizes";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";

import { FaStar } from "react-icons/fa";
import { Heading } from "../projects/ProjectInfo";
import { PanelForFreelancersPage } from "../job-listing/filtering/PanelForFreelancersPage";
import { browseFreelancerService } from "../../../services/users/user-services";
import { BASE_URL } from "../../../helper/base-url";
import Modal from "../../shared/modal/Modal";
import { ViewProfile } from "./ViewProfile";

const BrowseFreelancersPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [yearsOfExperience, setYearsOfExperienceFilters] = useState([]);
  const [experienceLevelFilters, setExperienceLevelFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [fetchFlag, setFetchFlag] = useState(false);
  const [defaultFreelancerList, setDefaultFreelancerList] = useState([]);
  const [subscribedFreelancerList, setSubscribedFreelancerList] = useState([]);
  const [freelancersListMeta, setFreelancersListMeta] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const handleApplyFilters = useCallback(async (data) => {
    setPage(1);
    setFetchFlag(!fetchFlag);
    const result = await browseFreelancerService(page, data);
    const defaultFreelancers = result.data?.result?.data.filter(
      (user) => user.subscribed == false,
    );
    const subscribedFreelancers = result.data?.result?.data.filter(
      (user) => user.subscribed == true,
    );
    setSubscribedFreelancerList([...subscribedFreelancers]);
    setDefaultFreelancerList([...defaultFreelancers]);
  }, []);

  useEffect(() => {
    async function browse() {
      const filters = {
        years_of_experience: yearsOfExperience,
        experience_level: experienceLevelFilters,
        first_name: keyword ? [keyword] : [],
      };
      const browsed = await browseFreelancerService(page, filters);
      const defaultFreelancers = browsed.data?.result?.data.filter(
        (user) => user.subscribed == false,
      );
      const subscribedFreelancers = browsed.data?.result?.data.filter(
        (user) => user.subscribed == true,
      );

      // setSubscribedFreelancerList([
      //   ...subscribedFreelancerList,
      //   ...subscribedFreelancers,
      // ]);
      // setDefaultFreelancerList([
      //   ...defaultFreelancerList,
      //   ...defaultFreelancers,
      // ]);

      setSubscribedFreelancerList([...subscribedFreelancers]);
      setDefaultFreelancerList([...defaultFreelancers]);

      setFreelancersListMeta(browsed?.data?.result?.meta);
    }

    browse();
  }, [page, fetchFlag]);

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    const filters = {
      years_of_experience: yearsOfExperience,
      experience_level: experienceLevelFilters,
      first_name: keyword ? [keyword] : [],
    };
    const browsed = await browseFreelancerService(page, filters);
    const defaultFreelancers = browsed.data?.result?.data.filter(
      (user) => user.subscribed == false,
    );
    const subscribedFreelancers = browsed.data?.result?.data.filter(
      (user) => user.subscribed == true,
    );

    setSubscribedFreelancerList([...subscribedFreelancers]);
    setDefaultFreelancerList([...defaultFreelancers]);
  };

  const [selectedFreelancers, setSelectedFreelancers] = useState(null);
  const toggleWithdrawModal = () => setSelectedFreelancers(null);
  return (
    <div>
      <PageHeader />
      <Container>
        <Heading style={{ textAlign: "left" }}>
          Browse Freelancers on Liber
        </Heading>
        <SearchBarContainer>
          <SearchInput
            placeholder="e.g. Gerald Serenio"
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
          More Filters <Arrow open={showFilters}>▶</Arrow>
        </FiltersToggle>

        {showFilters && (
          <div style={{ marginBottom: "1rem" }}>
            <PanelForFreelancersPage
              keywords={keyword}
              handleApplyFilters={handleApplyFilters}
              yearsOfExperience={yearsOfExperience}
              setYearsOfExperienceFilters={setYearsOfExperienceFilters}
              experienceLevelFilters={experienceLevelFilters}
              setExperienceLevelFilters={setExperienceLevelFilters}
            />
          </div>
        )}
        <PremiumFreelancersContainer>
          {subscribedFreelancerList?.map((data, index) => (
            <PremiumCard>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "30vh",
                }}
              >
                <div>
                  <PremiumBadge>Premium</PremiumBadge>
                </div>
                <div>
                  <div>
                    <strong>{`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}</strong>
                  </div>
                  <div style={{ color: gray }}>{data?.job_title}</div>
                  {data?.reviews?.length > 0 && (
                    <div style={{ color: "#f5c518" }}>
                      <FaStar /> {data?.reviews[0]?.reviews} ★
                    </div>
                  )}
                </div>
              </div>
              <Icon
                src={
                  data?.photo
                    ? `${BASE_URL}uploads/${data?.photo}`
                    : generateIcon("Empty")
                }
                alt="Aditya Kapoor"
                style={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "0",
                }}
              />
            </PremiumCard>
          ))}
          {/* Premium Freelancers */}
        </PremiumFreelancersContainer>

        {/* <FeaturedCard>
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
      </FeaturedCard> */}

        <ProjectList>
          {defaultFreelancerList?.map((data, index) => (
            <ProjectItem
              key={index}
              onClick={() => setSelectedFreelancers(index)}
            >
              <Modal
                isOpen={selectedFreelancers == index}
                onClose={toggleWithdrawModal}
                title="Freelancer Profile"
                modalContainerWidth="1200px"
              >
                <ViewProfile {...data} />
              </Modal>
              <ProfileContainer>
                <div>
                  <Icon
                    src={
                      data?.photo
                        ? `${BASE_URL}uploads/${data?.photo}`
                        : generateIcon("Empty")
                    }
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  {data?.reviews?.length > 0 && (
                    <div style={{ color: "#f5c518" }}>
                      <FaStar /> {data?.reviews[0]?.reviews} ★
                    </div>
                  )}
                </div>

                <ProjectMeta>
                  <ProjectRow>{`${data?.first_name} ${data?.middle_name} ${data?.last_name}`}</ProjectRow>
                  <ProjectRow
                    style={{
                      color: "#777",
                      filter: `blur(${loggedInUser ? 0 : 6}px)`,
                    }}
                  >
                    {data?.job_title}
                  </ProjectRow>
                </ProjectMeta>
              </ProfileContainer>
              <div>
                <ProjectRow
                  style={{ filter: `blur(${loggedInUser ? 0 : 6}px)` }}
                >
                  {data?.experience_level}
                </ProjectRow>
                <ProjectRow
                  style={{ filter: `blur(${loggedInUser ? 0 : 6}px)` }}
                >
                  {data?.years_of_experience ?? 0}{" "}
                  {`year${data?.years_of_experience > 1 ? "s" : ""} experience`}
                </ProjectRow>
              </div>
            </ProjectItem>
          ))}
        </ProjectList>
        {/* <BackToListingButton
          disabled={
            defaultFreelancerList?.length < freelancersListMeta?.total
              ? false
              : true
          }
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
            setFetchFlag(!fetchFlag);
          }}
          style={{
            opacity:
              defaultFreelancerList?.length < freelancersListMeta?.total
                ? 1
                : 0.5,
            cursor:
              defaultFreelancerList?.length < freelancersListMeta?.total
                ? "pointer"
                : "not-allowed",
          }}
        >
          Load more
        </BackToListingButton> */}
      </Container>
      <Footer />
    </div>
  );
};

export default BrowseFreelancersPage;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap}px;
`;

const PremiumFreelancersContainer = styled.div`
  display: flex;
  gap: ${gap}px;
  overflow-x: auto;
`;

const PremiumBadge = styled.span`
  background-color: ${primaryColor};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  display: inline-block;
`;

const PremiumCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  gap: ${gap}px;
  padding-bottom: 0;
  margin-bottom: 1rem;
  justify-content: center;
  width: 100%;
  font-family: ${fontFamily.font};
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

const Container = styled.div`
  padding: 2rem;
  font-family: ${fontFamily.font};
  margin: auto;
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
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  background-color: ${primaryColor};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const FiltersToggle = styled.button`
  background: none;
  border: none;
  color: ${black};
  font-family: ${fontFamily.font}
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
  height: 350px;
  overflow: auto;
`;

const ProjectItem = styled.div`
  border-bottom: 1px solid ${gray};
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
