import React, { useEffect, useState } from "react";
import { PageHeader } from "../../navigation/page-header";
import { FirstSection } from "./first-section/FirstSection";
import { PlatformFeature } from "./platform-feature-section/PlatformFeature";
import { MultipleOpportunities } from "./multiple-oppotunities-section/MultipleOpportunities";
import { FreelancerBenefits } from "./freelancer-benefits/FreelancerBenefits";
import { Testimonials } from "./testimonials-section/Testimonials";
import { PremiumFreelancers } from "./premium-freelancers/PremiumFreelancers";
import { BusinessBenefits } from "./business-benefits/BusinessBenefits";
import { OurClients } from "./our-clients/OurClients";
import { SubscriptionPlans } from "../../shared/sections/subscription-plan/SubscriptionPlans";
import { Footer } from "../../navigation/footer/Footer";
import { getPlatformFeatures } from "../../../services/platform-features/platform-features-services";
import { getMultipleOpportunities } from "../../../services/multiple-opportunities/multiple-opportunities-services";
import { getTestimonials } from "../../../services/testimonials/testimonials-services";
import { getFreelancerBenefits } from "../../../services/freelancer-benefits/freelancer-benefits-services";
import { getBusinessBenefits } from "../../../services/business-benefits/business-benefits-services";
import { getPremiumFreelancers } from "../../../services/premium-freelancers/premium-freelancers-services";
import { Workshops } from "./build-the-future/Workshops";
import LoadingScreen from "../../shared/loading/LoadingScreen";

export const Hompage = () => {
  const [loading, setLoading] = useState(false);
  const [platformFeatures, setPlatformFeatures] = useState();
  const [multipleOpportunities, setMultipleOpportunities] = useState();
  const [testimonials, setTestimonials] = useState();
  const [freelancerBenefits, setFreelancerBenefits] = useState();
  const [businessBenefits, setBusinessBenefits] = useState();
  const [premiumFreelancers, setPremiumFreelancers] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const platformFeaturesResult = await getPlatformFeatures();
        const multipleOpportunitiesResult = await getMultipleOpportunities();
        const testimonialsResult = await getTestimonials();
        const freelancerBenefitsResult = await getFreelancerBenefits();
        const businessBenefitsResult = await getBusinessBenefits();
        const premiumFreelancersResult = await getPremiumFreelancers();

        setPlatformFeatures(
          platformFeaturesResult?.data?.platform_features?.data,
        );
        setMultipleOpportunities(
          multipleOpportunitiesResult?.data?.result?.data,
        );
        setTestimonials(testimonialsResult?.data?.result?.data);
        setFreelancerBenefits(freelancerBenefitsResult?.data?.result?.data);
        setBusinessBenefits(businessBenefitsResult?.data?.result?.data);
        setPremiumFreelancers(premiumFreelancersResult?.data?.result?.data);
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

  return (
    <div>
      {!loading ? (
        <div>
          <PageHeader />
          <FirstSection />
          <PlatformFeature platformFeatures={platformFeatures} />
          <MultipleOpportunities
            multipleOpportunities={multipleOpportunities}
          />
          <FreelancerBenefits
            freelancerBenefits={freelancerBenefits}
            heading={"Freelancer benefits"}
          />
          <Workshops />
          {/* <FreelancerBenefits
        freelancerBenefits={buildingTheFuture}
        heading={"Workshops That Build the Future"}
      /> */}
          {/* <Testimonials testimonials={testimonials} /> */}
          <PremiumFreelancers premiumFreelancers={premiumFreelancers} />
          <BusinessBenefits businessBenefits={businessBenefits} />
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
