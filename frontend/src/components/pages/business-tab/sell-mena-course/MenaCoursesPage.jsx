import React, { useEffect, useState } from "react";
import { PageHeader } from "../../../navigation/page-header";
import { Workshops } from "../../homepage/build-the-future/Workshops";
import { OurClients } from "../../homepage/our-clients/OurClients";
import { SubscriptionPlans } from "../../../shared/sections/subscription-plan/SubscriptionPlans";
import { Footer } from "../../../navigation/footer/Footer";
import LoadingScreen from "../../../shared/loading/LoadingScreen";
import {
  Bold,
  FirstSection,
  GetStartedButton,
  Heading1,
  Heading2,
} from "./FirstSection";
import { HowItWorks } from "../../../shared/sections/how-it-works/HowItWorks";
import { WhyChooseLiber } from "../../../shared/sections/why-choose-liber/WhyChooseLiber";
import {
  desktopDevice,
  deviceMargin,
  gap,
  largeScreens,
  tabletDevice,
} from "../../../shared/styles/sizes";
import styled from "styled-components";

export const MenaCoursesPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, []);

  const buildingTheFuture = [
    {
      id: 3,
      title:
        "The next generation is already learning how to code apps, harness AI, master money, and build their digital brand. Liber Workshops are now live in schools across the UAE.",
    },
  ];

  const howItWorks = [
    {
      id: 3,
      title: "Step 1 – Subscribe",
      description: "Unlock course publishing.",
      user_type: "freelancers",
      icon: "HowItWorksSignUp",
      is_active: true,
      created_at: "2025-04-25T09:47:10.303Z",
      updated_at: "2025-04-25T09:47:10.303Z",
    },
    {
      id: 4,
      title: "Step 2 – Submit Your Course",
      description:
        "Fill out a quick form with your course content, details, and goals.",
      user_type: "freelancers",
      icon: "HowItWorksBrowse",
      is_active: true,
      created_at: "2025-04-25T12:38:21.979Z",
      updated_at: "2025-04-25T12:38:21.979Z",
    },
    {
      id: 6,
      title: "Step 3 – Get Published",
      description:
        "Our team will review and publish your course on the Liber platform.",
      user_type: "freelancers",
      icon: "HowItWorksMatch",
      is_active: true,
      created_at: "2025-04-25T12:38:42.389Z",
      updated_at: "2025-04-25T12:38:42.389Z",
    },
  ];

  const perks = [
    {
      id: 1,
      title: "Reach learners across the UAE and MENA region",
      description:
        "Share your expertise with students, graduates, professionals, and businesses looking to upskill.",
      user_type: "freelancers",
      is_active: true,
      created_at: "2025-04-25T12:37:00.627Z",
      updated_at: "2025-04-25T12:37:00.627Z",
    },
    {
      id: 2,
      title:
        "No platform fees — keep 100% of your course earnings (limited time)",
      description:
        "Earn more from every course you publish while we grow together.",
      user_type: "freelancers",
      is_active: true,
      created_at: "2025-04-25T12:37:10.969Z",
      updated_at: "2025-04-25T12:37:10.969Z",
    },
    {
      id: 4,
      title: "Get discovered through our growing network",
      description:
        "Be featured across our platform, social channels, and partner community.",
      user_type: "freelancers",
      is_active: true,
      created_at: "2025-04-25T12:37:24.336Z",
      updated_at: "2025-04-25T12:37:24.336Z",
    },
    {
      id: 5,
      title: "Build your personal brand as an expert",
      description:
        "Position yourself as a trusted voice in your field and grow your reach.",
      user_type: "freelancers",
      is_active: true,
      created_at: "2025-04-25T12:37:24.336Z",
      updated_at: "2025-04-25T12:37:24.336Z",
    },
  ];

  return (
    <div>
      {!loading ? (
        <div>
          <PageHeader />
          <FirstSection />
          <HowItWorks howItWorks={howItWorks} />
          <WhyChooseLiber type="mena" userType={"freelancer"} perks={perks} />
          {/* <FreelancerBenefits
        freelancerBenefits={buildingTheFuture}
        heading={"Workshops That Build the Future"}
      /> */}
          {/* <Testimonials testimonials={testimonials} /> */}
          <SubmitYourCourseContainer
            style={{ display: "block", textAlign: "left" }}
          >
            <div>
              <Bold style={{ fontSize: "30px" }}>
                Ready to Submit Your Course?
              </Bold>
            </div>
            <GetStartedButton>Submit my course</GetStartedButton>
            <Heading2
              style={{
                marginTop: gap * 3,
                marginBottom: gap,
                fontStyle: "italic",
              }}
            >
              Only available to subscribed users.
            </Heading2>
            <GetStartedButton>Subscribe Now</GetStartedButton>
          </SubmitYourCourseContainer>

          <OurClients />
          <SubscriptionPlans />
          <Footer />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

const SubmitYourCourseContainer = styled.div`
  margin: ${deviceMargin.mobile}px;

  @media (min-width: ${tabletDevice}px) {
    margin: ${deviceMargin.tablet}px;
  }

  @media (min-width: ${desktopDevice}px) {
    margin: ${deviceMargin.largeScreen}px;
  }

  @media (min-width: ${largeScreens}px) {
    margin: ${deviceMargin.largeScreen}px;
  }
`;
