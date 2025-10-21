import { useEffect, useState } from "react";
import { Footer } from "../../navigation/footer/Footer";
import { PageHeader } from "../../navigation/page-header";
import { GetStarted } from "../../shared/sections/get-started/GetStarted";
import { Reviews } from "../../shared/sections/reviews/Reviews";
import { primaryDarkColor } from "../../shared/styles/color";
import AboutUsHeading from "./heading/AboutUsHeading";
import AboutUsImagesSection from "./images-section/AboutUsImagesSection";
import AboutUsMidDescription from "./mid-description/AboutUsMidDescription";
import OurImpact from "./our-impact/OurImpact";
import { getTestimonialsByUserType } from "../../../services/testimonials/testimonials-services";
import { Users } from "lucide-react";
import { OurClients } from "../homepage/our-clients/OurClients";
import Objective from "./vison-mission/Objective";
import { MultipleOpportunities } from "../homepage/multiple-oppotunities-section/MultipleOpportunities";
import { getMultipleOpportunities } from "../../../services/multiple-opportunities/multiple-opportunities-services";
import SkillsetCovered from "./skillset/SkillsetCovered";
import LoadingScreen from "../../shared/loading/LoadingScreen";

const AboutUs = () => {
  const [reviews, setReviews] = useState([]);
  const [multipleOpportunities, setMultipleOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const testimonialsResult =
          await getTestimonialsByUserType("freelancers");
        const multipleOpportunitiesResult = await getMultipleOpportunities();

        setMultipleOpportunities(
          multipleOpportunitiesResult?.data?.result?.data,
        );
        setReviews(testimonialsResult?.data?.result?.data);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "0em",
      }}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {" "}
          <PageHeader />
          <AboutUsHeading />
          <AboutUsImagesSection />
          <AboutUsMidDescription />
          <OurImpact />
          <Objective />
          <OurClients />
          <SkillsetCovered multipleOpportunities={multipleOpportunities} />
          <Reviews testimonials={reviews} />
          <GetStarted
            heading={"Ready to get started?"}
            subHeading={
              "Work on projects that match your expertise, set your own schedule, and get paid securely—all in one place."
            }
            route={"/sign-up"}
            btnText={"Sign up"}
            leftContainerBgColor={primaryDarkColor}
            leftContainerTextColor={"white"}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AboutUs;
