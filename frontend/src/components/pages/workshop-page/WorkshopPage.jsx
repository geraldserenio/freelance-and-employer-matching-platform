import { useEffect, useState } from "react";
import { Footer } from "../../navigation/footer/Footer";
import { PageHeader } from "../../navigation/page-header";
import { GetStarted } from "../../shared/sections/get-started/GetStarted";
import { Reviews } from "../../shared/sections/reviews/Reviews";
import { primaryDarkColor } from "../../shared/styles/color";
import WorkshopHeadingSection from "./heading-section/WorkshopHeadingSection";
import ProgrammeOverview from "./programme-overview/ProgrammeOverview";
import WorkshopBenefits from "./workshop-benefits/WorkshopBenefits";
import WorkshopDescription from "./workshop-description/WorkshopDescription";
import { getReviews } from "../../../services/reviews/reviews-service";
import LoadingScreen from "../../shared/loading/LoadingScreen";
const WorkshopPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const reviews = await getReviews({
          page: 1,
          limit: 3,
          isStudent: true,
        });
        setReviews(reviews?.data?.result?.data);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {" "}
          <PageHeader />
          <WorkshopHeadingSection />
          <WorkshopDescription />
          <WorkshopBenefits />
          <ProgrammeOverview />
          <Reviews heading={"What students say:"} testimonials={reviews} />
          <GetStarted
            heading={"Book our workshop"}
            subHeading={
              "Partner with us, to deliver bespoke workshops for your students and classrooms"
            }
            btnText={"Contact us"}
            leftContainerBgColor={primaryDarkColor}
            leftContainerTextColor={"white"}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default WorkshopPage;
