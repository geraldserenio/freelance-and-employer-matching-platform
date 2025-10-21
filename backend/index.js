const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jwt_secret = process.env.JWT_TOKEN || "temporaryjwttoken";
const cors = require("cors");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const stripe = require("stripe")(process.env.STRIPE_SK_LIVE || "");

const requestLogger = require("./services/middleware/request-logger.middleware");
const {
  getUsers,
  authenticateUser,
  storeSubscription,
  createStripeAccountController,
} = require("./controller/user-management/userController");
const {
  getAllPlatformFeatures,
} = require("./api/platform-features/platform-features");
const {
  getAllMultipleOpportunities,
} = require("./api/multiple-opportunities/multiple-opportunities");
const {
  getAllTestimonials,
  getAllStudentTestimonials,
  getAllTestimonialsByUserType,
} = require("./api/testimonials/testimonials");
const {
  getAllFreelancerBenefits,
} = require("./api/freelancer-benefits/freelancer-benefits");
const {
  getAllBusinessBenefits,
} = require("./api/business-benefits/business-benefits");
const {
  getAllPremiumFreelancers,
} = require("./api/premium-freelancers/premium-freelancers");
const { getAllSubscriptions } = require("./api/subscriptions/subscriptions");
const WorkshopBenefitsApi = require("./api/workshop-benefits/workshop-benefits.api");
const ProgramApi = require("./api/programs/programs.api");
const PartneredUniversitiesApi = require("./api/partnered-universities/partnered-universities.api");
const {
  getAllHowItWorksByUserType,
} = require("./api/how-it-works/how-it-works");
const {
  getAllWhyChooseLiberByUserType,
} = require("./api/why-choose-liber/why-choose-liber");
const ProjectsApi = require("./api/projects/project.api");
const { UserApis } = require("./api/user/user.api");
const MailgunClient = require("./services/api-clients/mailgun.cient");
const {
  getAllOrByIdJobListings,
  getJobListingByFilter,
  storeApplicants,
  storeJobListing,
  deleteJobListingAPI,
  getJobListingByIdAPI,
  getAllJobListingByBusinessAPI,
} = require("./api/job-listing/job-listing");
const { verifyToken } = require("./api/verifyToken");
const {
  enableDisableUser,
  getUserByIdAPI,
  updateProfileAPI,
  verifyUserAPI,
  browseFreelancerAPI,
  updateStoreSubscriptionAndUpdateStepAPI,
} = require("./api/user/user");
const {
  getAllProjectsByBusiness,
  storeProjectAPI,
  getProjectByIdAPI,
  deleteProjectAPI,
  getAllProjectsByBusinessForDropdownAPI,
  browseProjectAPI,
  projectReviewAPI,
  getProjectByDeadlineAPI,
} = require("./api/projects/projects");

const {
  getPaymentByBusinessIdAPI,
  getPaymentByIdAPI,
  getPaymentByFreelancerIddAPI,
  getPaymentByAdminIdAPI,
  storePaymentAPI,
  deletePaymentAPI,
  updatePaymentStatusAPI,
} = require("./api/payment/payment-api");
const {
  getAllJobApplicantsByFreelancerIdAPI,
  updateApplicantStatusAPI,
  checkIfAlreadyAppliedAPI,
} = require("./api/job-applicants/job-applicants");
const {
  getConversationAPI,
  getConversationListAPI,
  sendMessageAPI,
  unsendMessageAPI,
  sendGuestMessageAPI,
  getGuestConversationAPI,
} = require("./api/messages/messages-api");

const {
  getAllCoursesAPI,
  storeCoursesAPI,
  getCourseByIdAPI,
  deleteCourseByIdAPI,
  updatePublishStatusByIdAPI,
  getAllCoursesByCategortAPI,
} = require("./api/courses/courses-api");
const { getRecommendedProjectAPI } = require("./api/reviews/reviews-api");
const {
  updateSubscriptionStatus,
} = require("./controller/subscriptions/subscriptions");

const { getAllSubscribedAPI } = require("./api/subscribed/subscribed-api");
const {
  storeProjectProposalAPI,
  getAllProjectProposalByBusinessIdAPI,
  getSpecificProjectProposalByIdAPI,
  acceptOrAcceptGIGProposalAPI,
  getAllProjectProposalByApplicantIdAPI,
  getAlreadyProposedFreelancerAPI,
} = require("./api/project-proposal/project-proposal-api");
const {
  getAllProjectMilestoneByUserIdAPI,
  getAllProjectMilestoneByProjectGigIdAPI,
  storeMilestoneAPI,
  getSpecificProjectMilestoneByIdAPI,
  getNeedsRevisionProjectMilestoneByIdAPI,
  updateStatusToNeedsReivisionAPI,
  getPendingProjectMilestoneByIdAPI,
  getAlreadySubmittedMilestoneFreelancerAPI,
  getSpecificProjectMilestoneByActualIdAPI,
} = require("./api/project-milestone/project-milestone-api");
const {
  storeGigPayemtns,
  updateGigPaymentStatus,
} = require("./controller/project-milestone/project-milestone-controller");
const {
  updateProjectStatus,
} = require("./controller/project-proposal/project-proposal-controller");
const {
  getAllProjectPaymentsByAdminAPI,
  transferFundsAPI,
} = require("./api/project-payments/project-payments-api");

app.use(cors());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Hello gerald1!");
});

// signup
app.post("/signup", UserApis.signup);

//login
//dont delete const hashedPassword = await bcrypt.hash('user_password', 10);
app.post("/authenticate", async (req, res) => {
  const { email, password, deviceId, deviceName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await authenticateUser(req.body);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //   const token = jwt.sign(
  //   { userId: user.id, email: user.email },
  //   jwt_secret,
  //   { expiresIn: '1h' }
  // );

  // return res.status(200).json({ token: token, user: user });

  // check password if it matches from the request
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    console.log(deviceId, deviceName);
    // Create a JWT token for the user to be used in FE
    const token = jwt.sign(
      {
        userId: user?.id,
        email: user?.email,
        user_type: user?.user_type,
        nationality: user?.nationality,
      },
      jwt_secret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token: token, user: user });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// app.get('/users', async (req, res) => {
//   // Get token from authorization header
//   const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const verifiedToken = await verifyToken(token);

//   if (verifiedToken) {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const users = await getUsers(page, limit);
//     return res.json({ users })
//   } else {
//     return res.status(401).json({ message: 'No token provided' });
//   }
// });

app.get("/users", async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const user_type = verifiedToken?.user_type;

    if (user_type !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admin can access this API" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await getUsers(page, limit);
    return res.json({ users });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

app.get("/users/:id", getUserByIdAPI);

app.get("/verify", verifyUserAPI);

app.post("/enable-disable-user", enableDisableUser);

app.get("/browse-freelancers", browseFreelancerAPI);

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

//platform-features
app.get("/platform-features", getAllPlatformFeatures);

//multiple-opportunities
app.get("/multiple-opportunities", getAllMultipleOpportunities);

//testimonials
app.get("/testimonials", getAllTestimonials);

//freelancer benefits
app.get("/freelancer-benefits", getAllFreelancerBenefits);

//business benefits
app.get("/business-benefits", getAllBusinessBenefits);

//premium benefits
app.get("/premium-freelancers", getAllPremiumFreelancers);

//premium benefits
app.get("/subscriptions", getAllSubscriptions);

//multiple-opportunities
app.get("/multiple-opportunities", getAllMultipleOpportunities);

//testimonials
app.get("/testimonials", getAllTestimonials);
app.get("/testimonials/:user_type", getAllTestimonialsByUserType);

//freelancer benefits
app.get("/freelancer-benefits", getAllFreelancerBenefits);

//business benefits
app.get("/business-benefits", getAllBusinessBenefits);

//premium benefits
app.get("/premium-freelancers", getAllPremiumFreelancers);

//premium benefits
app.get("/subscriptions", getAllSubscriptions);

//how it works
app.get("/how-it-works", getAllHowItWorksByUserType);

//why choose liber
app.get("/why-choose-liber/:user_type", getAllWhyChooseLiberByUserType);

//how it works
app.get("/how-it-works", getAllHowItWorksByUserType);

//why choose liber
app.get("/why-choose-liber/:user_type", getAllWhyChooseLiberByUserType);

// Dashboard Page
app.get("/recommended-project", ProjectsApi.getRecommendedProject);

app.get("/project-stats", ProjectsApi.getProjectStats);

app.get("/active-projects", ProjectsApi.getActiveProjects);

// workshop page
app.get("/workshop-benefits", WorkshopBenefitsApi.getAllWorkShopBenefits);

app.get("/workshop-programs", ProgramApi.getAllprograms);

app.get(
  "/partnered-universities",
  PartneredUniversitiesApi.getAllPartneredUniversities
);

app.get("/reviews", getAllStudentTestimonials);

// job listing
app.get("/job-listing", getAllOrByIdJobListings);
app.post("/job-listing", getJobListingByFilter);
app.post("/job", getJobListingByFilter);
app.get("/job/:id", getJobListingByFilter);
app.delete("/job", getJobListingByFilter);
app.post("/list-job", storeJobListing);
app.delete("/list-job/:id", deleteJobListingAPI);
app.get("/list-job/:id", getJobListingByIdAPI);
app.get("/list-job", getAllJobListingByBusinessAPI);

app.post("/check-already-applied", checkIfAlreadyAppliedAPI);

//job applicants
app.get("/client-jobs", getAllJobApplicantsByFreelancerIdAPI);
app.post("/update-application-status", updateApplicantStatusAPI);

//projects
app.get("/projects", getAllProjectsByBusiness);
app.post("/projects", storeProjectAPI);
app.post("/delete-project", deleteProjectAPI);
app.get("/projects/:id", getProjectByIdAPI);
app.get("/projects-deadline/:deadline", getProjectByDeadlineAPI);
app.get("/projects-dropdown", getAllProjectsByBusinessForDropdownAPI);
app.get("/browse-projects", browseProjectAPI);

app.post("/project-review", projectReviewAPI);
app.get("/get-recommended-project", getRecommendedProjectAPI);

//freelancer-courses
app.get("/freelancer-courses", getAllCoursesAPI);
app.post("/freelancer-courses", storeCoursesAPI);
app.get("/freelancer-courses/:id", getCourseByIdAPI);
app.post("/delete-course", deleteCourseByIdAPI);
app.post("/update-course-status", updatePublishStatusByIdAPI);
app.get("/browse-courses", getAllCoursesByCategortAPI);

// File Upload Route
app.post("/apply", upload.single("file"), storeApplicants);

app.post("/update-profile", upload.single("uploadedPhoto"), updateProfileAPI);
app.post("/subscribe", updateStoreSubscriptionAndUpdateStepAPI);

//payments
app.get("/freelancer-payments", getPaymentByFreelancerIddAPI);
app.post("/freelancer-payments", storePaymentAPI);
app.delete("/freelancer-payments/:id", deletePaymentAPI);
app.get("/business-payments", getPaymentByBusinessIdAPI);
app.get("/admin-payments", getPaymentByAdminIdAPI);
app.get("/payment/:id", getPaymentByIdAPI);
app.post("/update-payment-status", updatePaymentStatusAPI);

//messages
app.get("/get-conversation", getConversationAPI);
app.get("/get-guest-conversation", getGuestConversationAPI);
app.get("/get-conversation-list", getConversationListAPI);
app.post("/send-message", upload.single("image"), sendMessageAPI);
app.post("/unsend-message", unsendMessageAPI);
app.post("/store-guest-message", sendGuestMessageAPI);

//project proposal
app.post("/store-project-proposal", storeProjectProposalAPI);
app.post("/accept-or-reject-proposal", acceptOrAcceptGIGProposalAPI);

app.get(
  "/get-specific-project-proposal-by-id/:id",
  getSpecificProjectProposalByIdAPI
);

app.get(
  "/get-all-project-proposal-by-client",
  getAllProjectProposalByBusinessIdAPI
);

app.get(
  "/get-all-project-proposal-by-applicant",
  getAllProjectProposalByApplicantIdAPI
);

app.get("/get-already-proposed-freelancer", getAlreadyProposedFreelancerAPI);

//MILESTONE
app.post("/store-milestone", upload.single("image"), storeMilestoneAPI);
app.get(
  "/get-specific-project-milestone-by-id/:id",
  getSpecificProjectMilestoneByIdAPI
);

app.get(
  "/get-specific-project-milestone-by-actualid/:id",
  getSpecificProjectMilestoneByActualIdAPI
);

app.get(
  "/get-already-submitted-milestone-freelancer",
  getAlreadySubmittedMilestoneFreelancerAPI
);

app.get(
  "/get-needs-revision-project-milestone-by-id",
  getNeedsRevisionProjectMilestoneByIdAPI
);

app.post("/update-status-to-needs-revision", updateStatusToNeedsReivisionAPI);

app.get(
  "/get-pending-project-milestone-by-id",
  getPendingProjectMilestoneByIdAPI
);

////freelancer
app.get(
  "/get-all-project-milestone-by-user-id",
  getAllProjectMilestoneByUserIdAPI
);

////client
app.get(
  "/get-all-project-milestone-by-project-gig-id/:project_gig_id",
  getAllProjectMilestoneByProjectGigIdAPI
);

//subscribed
app.get("/get-all-subscribed", getAllSubscribedAPI);

//admin payments

app.get("/get-all-payments-from-gig", getAllProjectPaymentsByAdminAPI);

app.post("/transfer-funds", transferFundsAPI);

app.post("/create-stripe-account", createStripeAccountController);

//////stripe
//////stripe
//////stripe
//////stripe
//////stripe
app.post("/create-payment-intent", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { amount, subscription_id } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
      const dollarAmount = (amount / 100).toFixed(2);
      await storeSubscription({
        subscription_id: subscription_id,
        userId: verifiedToken?.userId,
        stripe_id: paymentIntent?.id,
        amount: dollarAmount,
        email: verifiedToken?.email,
        country: verifiedToken?.nationality ?? "",
      });

      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send({ error: `Webhook Error: ${err.message}` });
  }

  const { type, data } = event;
  const paymentIntent = data?.object;

  try {
    if (type === "payment_intent.succeeded") {
      const {
        id,
        amount,
        currency,
        status,
        created,
        customer,
        description,
        payment_method,
        receipt_email,
        metadata,
      } = paymentIntent;

      console.log("✅ PaymentIntent Succeeded:");
      console.log({
        id,
        amount,
        currency,
        status,
        created,
        customer,
        description,
        payment_method,
        receipt_email,
        metadata,
      });

      // TODO: Save to DB, trigger internal success logic, etc.
    }

    res.status(200).send({ received: true });
  } catch (err) {
    console.error("❌ Webhook Handler Error:", err);
    res.status(500).send({ error: "Webhook handler failed" });
  }
});

app.post("/update-subscription-status", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { status, stripe_id } = req.body;
    try {
      if (status === "succeeded") {
        updateSubscriptionStatus({
          status: "succeeded",
          stripe_id: stripe_id,
          userId: verifiedToken?.userId,
        });
        res.status(200).send({ message: "success" });
      } else {
        updateSubscriptionStatus({
          status: "failed",
          stripe_id: stripe_id,
          userId: verifiedToken?.userId,
        });
        res.status(200).send({ message: "success" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

app.post("/update-gig-payment-status", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { status, stripe_id } = req.body;
    try {
      if (status === "succeeded") {
        updateGigPaymentStatus({
          status: "succeeded",
          stripe_id: stripe_id,
        });
        res.status(200).send({ message: "success" });
      } else {
        updateGigPaymentStatus({
          status: "failed",
          stripe_id: stripe_id,
        });
        res.status(200).send({ message: "success" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

new MailgunClient();

//
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//subscribed
app.get("/get-all-subscribed", getAllSubscribedAPI);

app.post("/create-payment-intent-for-gig", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { amount, project_milestone_id, project_id, project_proposal_id } =
      req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
      const dollarAmount = (amount / 100).toFixed(2);
      await updateProjectStatus(project_id, "completed");
      await storeGigPayemtns({
        project_milestone_id: project_milestone_id,
        userId: verifiedToken?.userId,
        stripe_id: paymentIntent?.id,
        amount: dollarAmount,
        email: verifiedToken?.email,
        country: verifiedToken?.nationality ?? "",
        project_proposal_id: project_proposal_id,
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});
