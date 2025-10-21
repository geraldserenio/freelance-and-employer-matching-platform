import AboutUs from "../components/pages/about-us/AboutUs";
import BrowseFreelancersPage from "../components/pages/browse-freelancers/BrowseFreelancersPage";
import BrowseProjectsPage from "../components/pages/browse-projects/BrowseProjectPage";
import { BusinessTab } from "../components/pages/business-tab/BusinessTab";
import { MenaCoursesPage } from "../components/pages/business-tab/sell-mena-course/MenaCoursesPage";
import BrowseCourses from "../components/pages/courses/BrowseCourses";
import { FreelancersTab } from "../components/pages/freelancers-tab/FreelancersTab";
import HealthCheck from "../components/pages/health-checker/HealthCheck";
import { Hompage } from "../components/pages/homepage/Hompage";
import { JobListing } from "../components/pages/job-listing/JobListing";
import LiberLogin from "../components/pages/liber-login/LiberLogin";
import { Signup } from "../components/pages/signup";
import { VerifyPage } from "../components/pages/user-management/VerifyPage";
import WorkshopPage from "../components/pages/workshop-page/WorkshopPage";

export const PUBLIC_ROUTES = [
  {
    path: "/",
    element: Hompage,
  },
  {
    path: "/login",
    element: LiberLogin,
  },
  {
    path: "/sign-up",
    element: Signup,
  },
  {
    path: "/home",
    element: Hompage,
  },
  {
    path: "/freelancers-tab",
    element: FreelancersTab,
  },
  {
    path: "/business-tab",
    element: BusinessTab,
  },
  {
    path: "/workshop",
    element: WorkshopPage,
  },
  {
    path: "/about-us",
    element: AboutUs,
  },
  {
    path: "/job-listings",
    element: JobListing,
  },
  {
    path: "health",
    element: HealthCheck,
  },
  {
    path: "verify",
    element: VerifyPage,
  },
  {
    path: "liber-learn",
    element: MenaCoursesPage,
  },

  {
    path: "/browse-freelancers",
    element: BrowseFreelancersPage,
  },
  {
    path: "/browse-projects",
    element: BrowseProjectsPage,
  },

  {
    path: "/browse-courses",
    element: BrowseCourses,
  },
];
