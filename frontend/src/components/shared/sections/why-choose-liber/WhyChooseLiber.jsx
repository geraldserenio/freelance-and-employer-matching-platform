import React from "react";
import styled from "styled-components";
import { panelBackground, primaryBtnColor } from "../../styles/color";
import { HeadingSection } from "../../generic/headers";
import { Perks } from "./Perks";
import { RecommendedProjectCard } from "./RecommendedProjectCard";
import { generateIcon, Icon } from "../../icons/generate-icon";
import {
  desktopDevice,
  deviceMargin,
  largeScreens,
  tabletDevice,
} from "../../styles/sizes";

export const WhyChooseLiber = (props) => {
  const { userType, perks, type } = props;
  const skills = [
    { id: 1, skill_name: "Photoshop" },
    { id: 2, skill_name: "Illustrator" },
  ];
  return (
    <Container
      style={{
        backgroundColor:
          userType === "freelancer" ? panelBackground : "#1D1E2B",
      }}
    >
      <LeftContainer>
        <PerksContainer>
          <HeadingSection
            style={{
              marginLeft: "30px",
              color: userType === "freelancer" ? primaryBtnColor : "#F7F7F7",
            }}
          >
            {type == "mena" ? "Why Sell with Liber?" : "Why choose Liber?"}
          </HeadingSection>
          {perks?.map((data) => {
            return (
              <Perks
                icon={userType === "freelancer" ? "CheckBlue" : "CheckGreen"}
                heading={data?.title}
                subHeading={data.description}
              />
            );
          })}
        </PerksContainer>
      </LeftContainer>
      {userType === "freelancer" ? (
        <RightContainer>
          <RecommendedProjectCardContainer>
            {/* <RecommendedProjectCard
              project_name={"Creative Graphic Designer for Branding"}
              skills={skills}
            /> */}
          </RecommendedProjectCardContainer>
          <div>
            <ImageForFreelancer
              src={generateIcon("ForFreelancerTabWhyChooseLiber")}
            />
          </div>
          <ProjectStatsContainer>
            <Icon
              src={generateIcon("ProjectStats")}
              style={ProjectStatsStyles}
            />
          </ProjectStatsContainer>
        </RightContainer>
      ) : (
        <RightContainer>
          <RecommendedProjectCardContainer
            style={{ zIndex: 1, marginBottom: "-135px", marginRight: "85px" }}
          >
            <Icon
              src={generateIcon("ProjectStatsWhite")}
              style={ProjectStatsStyles}
            />
          </RecommendedProjectCardContainer>
          <div>
            <ImageForFreelancer
              src={generateIcon("ForBusinessTabWhyChooseLiber")}
            />
          </div>
          <ProjectStatsContainer style={{ zIndex: 3, marginTop: "-72px" }}>
            <Icon src={generateIcon("WhyLiberSarah")} style={SarahStyles} />
          </ProjectStatsContainer>
        </RightContainer>
      )}
    </Container>
  );
};

const ImageForFreelancer = styled(Icon)`
  display: none;

  @media (min-width: ${tabletDevice}px) {
    height: 529px;
    width: 398px;
    border-radius: 40px;
    z-index: 2;
    position: relative;
    display: inline;
  }

  @media (min-width: ${desktopDevice}px) {
    height: 529px;
    width: 598px;
    border-radius: 40px;
    z-index: 2;
    position: relative;
    display: inline;
  }

  @media (min-width: ${largeScreens}px) {
    height: 529px;
    width: 598px;
    border-radius: 40px;
    z-index: 2;
    position: relative;
    display: inline;
  }
`;

const RecommendedProjectCardContainer = styled.div`
  display: flex;
  justify-content: end;
  z-index: 3;
  position: relative;
  margin-bottom: 0px;

  @media (min-width: ${tabletDevice}px) {
    display: flex;
    justify-content: end;
    z-index: 3;
    position: relative;
    margin-bottom: 0px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: flex;
    justify-content: end;
    z-index: 3;
    position: relative;
    margin-bottom: 0px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    justify-content: end;
    z-index: 3;
    position: relative;
    margin-bottom: 0px;
  }
`;

const ProjectStatsContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-top: -118px;
  zindex: 1;
  position: relative;
`;

const ProjectStatsStyles = {
  width: "342px",
  height: "233px",
  textAlign: "left",
  zIndex: 1,
};

const SarahStyles = {
  width: "389px",
  height: "101px",
  textAlign: "left",
  zIndex: 3,
};

const PerksContainer = styled.div``;

const Container = styled.div`
  display: grid;
  padding-top: 60px;
  border-radius: 60px;
  background-color: ${panelBackground};
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    display: grid;
    padding-top: 60px;
    border-radius: 60px;
    background-color: ${panelBackground};
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    display: grid;
    padding-top: 60px;
    border-radius: 60px;
    background-color: ${panelBackground};
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    display: flex;
    padding-top: 60px;
    border-radius: 60px;
    background-color: ${panelBackground};
    margin: ${deviceMargin.largeScreen}px;
  }
`;

const LeftContainer = styled.div`
  @media (min-width: ${largeScreens}px) {
    width: 50%;
  }
`;

const RightContainer = styled.div`
  display: none;
  @media (min-width: ${largeScreens}px) {
    width: 50%;
    display: inline;
  }
`;
