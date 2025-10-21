import React, { useEffect, useState } from "react";
import { PageHeader } from "../../navigation/page-header";
import { Footer } from "../../navigation/footer/Footer";
import { HeadingSection } from "./heading-section/HeadingSection";
import { SubscriptionPlans } from "../../shared/sections/subscription-plan/SubscriptionPlans";
import { Reviews } from "../../shared/sections/reviews/Reviews";
import { SignUpAsSection } from "../../shared/sections/sign-up-as/SignUpAsSection";
import { HowItWorks } from "../../shared/sections/how-it-works/HowItWorks";
import { GetStarted } from "../../shared/sections/get-started/GetStarted";
import { WhyChooseLiber } from "../../shared/sections/why-choose-liber/WhyChooseLiber";
import { getHowItWorks } from "../../../services/how-it-works/how-it-works-services";
import { getTestimonialsByUserType } from "../../../services/testimonials/testimonials-services";
import { getWhyChooseLiberByUserType } from "../../../services/why-choose-liber/why-choose-liber-services";
import LoadingScreen from "../../shared/loading/LoadingScreen";

export const BusinessTab = () => {
  const [howItWorks, setHowItWorks] = useState();
  const [testimonials, setTestimonials] = useState();
  const [perks, setWhyChooseLiber] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const howItWorksResult = await getHowItWorks("business");
        const testimonialsResult = await getTestimonialsByUserType("business");
        const whyChooseLiberResult =
          await getWhyChooseLiberByUserType("business");

        setTestimonials(testimonialsResult?.data?.result?.data);
        setHowItWorks(howItWorksResult?.data?.result?.data);
        setWhyChooseLiber(whyChooseLiberResult?.data?.result?.data);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {" "}
          <PageHeader />
          <HeadingSection />
          <SignUpAsSection btnText={"Sign up as a business"} />
          <HowItWorks howItWorks={howItWorks} />
          <WhyChooseLiber userType={"business"} perks={perks} />
          <Reviews
            heading={"What businesses say:"}
            testimonials={testimonials}
          />
          <SubscriptionPlans />
          <GetStarted
            heading={"Ready to get started?"}
            subHeading={
              "Work on projects that match your expertise, set your own schedule, and get paid securely—all in one place."
            }
            btnText={"Sign up"}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};
