import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { JobHeader } from "./job-header/JobHeader";
import { Listing } from "./Listing";
import { Panel } from "./filtering/Panel";
import styled from "styled-components";
import { secondaryBlueColor } from "../../shared/styles/color";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  tabletDevice,
} from "../../shared/styles/sizes";
import { fontFamily } from "../../shared/styles/theme";
import { generateIcon } from "../../shared/icons/generate-icon";
import { Toggleicon } from "../../shared/inputs/DropdownSelect";
import {
  getJobListingByFilter,
  getJobListingList,
} from "../../../services/job-listings/job-listings-services";
import { BackToListingButton } from "./job-header/JobApplicationInfo";
import LoadingScreen from "../../shared/loading/LoadingScreen";

export const JobListing = () => {
  const [isPanelOpen, setIsOpen] = useState(false);
  const [jobListingList, setJobListingList] = useState([]);
  const [jobListingListMeta, setJobListingListMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [contractFilters, setContractFilters] = useState([]);
  const [experienceLevelFilters, setExperienceLevelFilters] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);
  const [salaryFilters, setSalaryFilters] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const filters = {
          contract_type: contractFilters,
          experience_level: experienceLevelFilters,
          salary: salaryFilters,
          location: locationFilters,
          job_title: keyword ? [keyword] : [],
        };

        const jobListingListResult = await getJobListingList(
          null,
          "open",
          page,
          filters,
        );

        setJobListingList([
          ...jobListingList,
          ...jobListingListResult.data?.result?.data,
        ]);

        setJobListingListMeta(jobListingListResult?.data?.result?.meta);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [fetchFlag]);

  const handleChangeKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, []);

  const handleApplyFilters = useCallback(async (data) => {
    setPage(1);
    setJobListingList([]);
    setFetchFlag(!fetchFlag);
    const filteredJobListingResult = await getJobListingByFilter(data, page);

    setJobListingList(filteredJobListingResult?.data?.result?.data);
  }, []);

  return (
    <div>
      <PageHeader />
      <JobHeader
        setJobListingList={setJobListingList}
        setFetchFlag={setFetchFlag}
        fetchFlag={fetchFlag}
        heading={"Job Listings"}
        subHeading={"Find your next role with Liber "}
        onChange={handleChangeKeyword}
      />

      <PanelContainer>
        <MoreFiltersContainer onClick={() => setIsOpen(!isPanelOpen)}>
          More filters
          {isPanelOpen ? (
            <Toggleicon>{generateIcon("Close")}</Toggleicon>
          ) : (
            <Toggleicon>{generateIcon("ToggleDown")}</Toggleicon>
          )}
        </MoreFiltersContainer>
        {isPanelOpen && (
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
        )}
      </PanelContainer>
      {loading ? (
        <LoadingScreen styles={{ height: "20vh" }} />
      ) : (
        <div>
          {jobListingList?.map((data, index) => {
            return <Listing {...data} key={index} />;
          })}
        </div>
      )}

      <BackToListingButton
        disabled={
          jobListingList?.length < jobListingListMeta?.total ? false : true
        }
        onClick={() => {
          setPage((prevPage) => prevPage + 1);
          setFetchFlag(!fetchFlag);
        }}
        style={{
          opacity: jobListingList?.length < jobListingListMeta?.total ? 1 : 0.5,
          cursor:
            jobListingList?.length < jobListingListMeta?.total
              ? "pointer"
              : "not-allowed",
        }}
      >
        Load more
      </BackToListingButton>

      <Footer />
    </div>
  );
};

const PanelContainer = styled.div`
  padding: ${deviceMargin.mobile}px;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: ${gap}px;
  @media (min-width: ${tabletDevice}px) {
    display: grid;
    padding: ${deviceMargin.tablet}px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    padding: ${deviceMargin.largeScreen}px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    padding: ${deviceMargin.largeScreen}px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

export const MoreFiltersContainer = styled.button`
  background-color: ${secondaryBlueColor};
  font-family: ${fontFamily.font};
  width: 196px;
  border-radius: ${gap + 2}px;
  border-radius: 12px;
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  padding-left: 16px;
  border: 0;
  cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: -2%;
`;
