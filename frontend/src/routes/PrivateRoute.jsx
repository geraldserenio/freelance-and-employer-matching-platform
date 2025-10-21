import StripeOnboard from "../components/pages/admin/users/project-payments/onboard-freelancer/StripeOnboard";
import { ProjectPayments } from "../components/pages/admin/users/project-payments/ProjectPayments";
import { SubscribersPage } from "../components/pages/admin/users/subscribed/SubscribersPage";
import PaymentPage from "../components/pages/browse-projects/gig/client/PaymentPage";
import { ProjectProposals } from "../components/pages/browse-projects/gig/client/ProjectProposals";
import { ReviewPage } from "../components/pages/browse-projects/gig/client/ReviewPage";
import { ProjectGig } from "../components/pages/browse-projects/gig/freelancer/ProjectGig";
import { Dashboard } from "../components/pages/Dashboard/Dashboard";
import { MyJobApplications } from "../components/pages/Dashboard/job-applications/MyJobApplications";
import { JobsList } from "../components/pages/Dashboard/job-listing-management";
import { CreateJobListing } from "../components/pages/Dashboard/job-listing-management/CreateJobListing";
import { ViewJobList } from "../components/pages/Dashboard/job-listing-management/ViewJobList";
import { Profile } from "../components/pages/Dashboard/Profile";
import { AddCourse } from "../components/pages/freelancer-courses/AddCourse";
import { FreelancerCourseList } from "../components/pages/freelancer-courses/FreelancerCourseList";
import { ViewCourse } from "../components/pages/freelancer-courses/ViewCourse";
import { ApplicationPage } from "../components/pages/job-listing/ApplicationPage";
import { Messages } from "../components/pages/messages/Messages";
import { BusinessPaymentsList } from "../components/pages/payments/business/BusinessPaymentsList";
import { Payments } from "../components/pages/payments/Payments";
import { AddProject } from "../components/pages/projects/AddProject";
import { Projects } from "../components/pages/projects/Projects";
import { ViewProject } from "../components/pages/projects/ViewProject";
import { CheckoutForm } from "../components/pages/subscription/CheckoutForm";
import { ChoosePlan } from "../components/pages/subscription/ChoosePlan";
import SubscriptionPage from "../components/pages/subscription/SubscriptionPage";
import { UserList } from "../components/pages/user-management";

export const PRIVATE_ROUTES = [
  {
    path: "/users",
    element: UserList,
  },
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/job-application",
    element: ApplicationPage,
  },
  {
    path: "/projects",
    element: Projects,
  },
  {
    path: "/add-project",
    element: AddProject,
  },
  {
    path: "/update-project",
    element: AddProject,
  },
  {
    path: "/view-project",
    element: ViewProject,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/jobs",
    element: JobsList,
  },
  {
    path: "/create-job",
    element: CreateJobListing,
  },
  {
    path: "/update-job",
    element: CreateJobListing,
  },
  {
    path: "/payments",
    element: Payments,
  },
  {
    path: "/view-applicants",
    element: ViewJobList,
  },
  {
    path: "/job-applications",
    element: MyJobApplications,
  },
  {
    path: "/track-payments",
    element: BusinessPaymentsList,
  },
  {
    path: "/messages",
    element: Messages,
  },
  {
    path: "/freelancer-courses",
    element: FreelancerCourseList,
  },
  {
    path: "/publish-requests",
    element: FreelancerCourseList,
  },
  {
    path: "/create-course",
    element: AddCourse,
  },
  {
    path: "/update-course",
    element: AddCourse,
  },

  {
    path: "/view-course",
    element: ViewCourse,
  },
  {
    path: "/subscribe",
    element: ChoosePlan,
  },
  {
    path: "/register/freelancer/profile",
    element: Profile,
  },
  {
    path: "/checkout",
    element: CheckoutForm,
  },
  {
    path: "/checkout-form",
    element: SubscriptionPage,
  },
  {
    path: "/subscribers",
    element: SubscribersPage,
  },
  {
    path: "/gigs",
    element: ProjectGig,
  },
  {
    path: "/gig-proposals",
    element: ProjectProposals,
  },
  {
    path: "/gig-payment-form",
    element: PaymentPage,
  },

  {
    path: "/review",
    element: ReviewPage,
  },
  {
    path: "/gig-payments",
    element: ProjectPayments,
  },
  { path: "/stripe-onboard", element: StripeOnboard },
];
