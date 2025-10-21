import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { fontFamily } from "../../shared/styles/theme";
import { gap } from "../../shared/styles/sizes";
import { gray, primaryColor } from "../../shared/styles/color";
import { PageHeader } from "../../navigation/page-header";
import { StyledInput } from "../../shared/inputs/LoginField";
import { Footer } from "../../navigation/footer/Footer";
import { BackToListingButton } from "../job-listing/job-header/JobApplicationInfo";

const BrowseFreelancersPage = () => {
  return (
    <div>
      <PageHeader />
      <Container>
        <div>
          <Header>Browse freelancers on Liber</Header>
          <SearchBar>
            <StyledInput type="text" placeholder="Search by name or keywords" />
            <button>Search</button>
          </SearchBar>
          <Filters>▶More filters ▼ </Filters>
        </div>
        <PremiumFreelancersContainer>
          {" "}
          {/* Premium Freelancers */}
          <PremiumCard>
            <Icon src={generateIcon("Sarah")} alt="Aditya Kapoor" />
            <div>
              <PremiumBadge>Premium</PremiumBadge>
              <div>
                <strong>Aditya Kapoor</strong>
              </div>
              <div>Web Developer</div>
              <div style={{ color: "#f5c518" }}>
                <FaStar /> 5.0 ★
              </div>
            </div>
          </PremiumCard>
          <PremiumCard>
            <Icon src={generateIcon("Sarah")} alt="Aditya Kapoor" />
            <div>
              <PremiumBadge>Premium</PremiumBadge>
              <div>
                <strong>Sarah Williams</strong>
              </div>
              <div>UI/UX Designer</div>
              <div style={{ color: "#f5c518" }}>
                <FaStar /> 4.9 ★
              </div>
            </div>
          </PremiumCard>
        </PremiumFreelancersContainer>

        {/* Other Freelancers */}
        <FreelancerList>
          {[
            {
              name: "Samuel Green",
              role: "UI/UX Designer",
              location: "Dubai, UAE",
              experience: "8 years",
            },
            {
              name: "Jane Foster",
              role: "Copywriter",
              location: "Dubai, UAE",
              experience: "6 years",
            },
            {
              name: "Michael Chen",
              role: "Software Engineer",
              location: "Dubai, UAE",
              experience: "10 years",
            },
            {
              name: "Emily Brown",
              role: "Graphic Designer",
              location: "Dubai, UAE",
              experience: "7 years",
            },
            {
              name: "David Smith",
              role: "SEO Specialist",
              location: "Dubai, UAE",
              experience: "7 years",
            },
            {
              name: "Olivia Taylor",
              role: "Project Manager",
              location: "Dubai, UAE",
              experience: "5 years",
            },
          ].map((f, index) => (
            <FreelancerItem key={index}>
              <Icon
                src={generateIcon("Sarah")}
                alt={f.name}
                style={{ width: "5%" }}
              />
              <Info style={{ width: "95%" }}>
                <div style={{ textAlign: "left" }}>
                  <strong>{f.name}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <div>{f.role}</div>
                    <div>{f.location}</div>
                    <div>{f.experience} of experience</div>
                  </div>
                  <div>
                    <div>{f.role}</div>
                    <div>{f.location}</div>
                    <div>{f.experience} of experience</div>
                  </div>
                </div>
              </Info>
            </FreelancerItem>
          ))}
        </FreelancerList>
        <BackToListingButton>Browse more</BackToListingButton>
      </Container>
      <Footer />
    </div>
  );
};

export default BrowseFreelancersPage;

const PremiumFreelancersContainer = styled.div`
  display: flex;
  gap: ${gap}px;
`;

const Container = styled.div`
  font-family: ${fontFamily.font};
  margin: auto;
  padding: 15rem;
  padding-top: 0;
  padding-bottom: 0;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: ${fontFamily.font};
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  gap: ${gap}px;
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    color: white;
    border-radius: 15px;
    cursor: pointer;
    background-color: ${primaryColor};
  }
`;

const Filters = styled.div`
  margin-bottom: 1.5rem;
  color: ${primaryColor};
  cursor: pointer;
  text-align: left;
`;

const PremiumCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  font-family: ${fontFamily.font};
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 1rem;
  }
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

const FreelancerList = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  width: 60%;
  margin: auto;
  height: 350px;
  overflow: auto;
`;

const FreelancerItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  font-family: ${fontFamily.font};
  border-bottom: 1px solid ${gray};
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  padding: ${gap}px;
`;

const Info = styled.div`
  line-height: 1.4;
  width: 100%;
  display: block;
`;
