import { formatKey } from "../../../../utils/textFormatter";
import {
  ActionButton,
  ActionContainer,
} from "../../../shared/datatable/ActionButton";

// export const dashRecommendedData = {
//     projectTitle: "Creative Graphic Designer for Branding",
//     skillChipset: [ "Photoshop", "Illustrator"],
//     client: 'Liber',
//     paymentTerms: {
//       value:100,
//       agreement:"negotiable"
//     },
//     timeline: 15
//   }

//  export const projectStats = [
//     { name: "Total projects", value: 30, color: "blue" },
//     { name: "Completed projects", value: 50, color: "green" },
//     { name: "Cancelled projects", value: 44, color: "red" },
//     { name: "Completion pverage", value: "83%", color: "orange" },
// ]

// data table
export const columns = [
  { field: "project_name", headerName: "Project Name", flex: 1 },
  { field: "client", headerName: "Client", flex: 1 },
  { field: "deadline", headerName: "Deadline", flex: 1 },
  //{ field: 'tags', headerName: 'Tags', flex: 1 },
  { field: "payment_terms", headerName: "Payment Terms", flex: 1 },
  {
    field: "job_listing_status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      let bgColor = "#ccc";
      let text = formatKey(params.value);

      switch (params.value) {
        case "in_progress":
          bgColor = "#FFA500"; // Orange
          break;
        case "completed":
          bgColor = "#4CAF50"; // Green
          break;
        case "closed":
          bgColor = "#FF4D4D"; // Red
          break;
        case "open":
          bgColor = "#ccccb3"; // gray
          break;
        default:
          break;
      }
      return (
        <div
          style={{
            backgroundColor: bgColor,
            color: "white",
            fontWeight: "bold",
            borderRadius: "30px",
            padding: "8px 12px",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            lineHeight: "1",
            fontSize: "12px",
            minWidth: "60px",
          }}
        >
          {text}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {},
  },
];

// export const rows = [
//   { id: 1, projectName: "E-commerce Website", client: "John Doe", deadline: "2024-03-15", tags: "React, Node.js", paymentTerms: "50% Upfront", status: "In-progress" },
//   { id: 2, projectName: "Mobile App UI/UX", client: "Sarah Lee", deadline: "2024-02-28", tags: "Figma, AdobeXD", paymentTerms: "Full Payment", status: "Completed" },
//   { id: 3, projectName: "SEO Optimization", client: "TechCorp Inc.", deadline: "2024-03-10", tags: "SEO, Marketing", paymentTerms: "Hourly", status: "Ongoing" },
//   { id: 4, projectName: "Landing Page Design", client: "StartupX", deadline: "2024-03-05", tags: "HTML, CSS, JS", paymentTerms: "Per Milestone", status: "Cancelled" },
//   { id: 5, projectName: "CRM Development", client: "BizSolutions", deadline: "2024-04-01", tags: "Python, Django", paymentTerms: "50% Upfront", status: "In-progress" },
//   { id: 6, projectName: "Social Media Marketing", client: "InstaGrowth", deadline: "2024-02-25", tags: "Facebook Ads, Instagram", paymentTerms: "Monthly", status: "Completed" },
//   { id: 7, projectName: "Blockchain Wallet", client: "CryptoWorld", deadline: "2024-05-10", tags: "Solidity, Web3", paymentTerms: "50% Upfront", status: "Ongoing" },
//   { id: 8, projectName: "AI Chatbot", client: "SupportPlus", deadline: "2024-03-30", tags: "Python, NLP", paymentTerms: "Full Payment", status: "In-progress" },
//   { id: 9, projectName: "Company Branding", client: "BrandBoost", deadline: "2024-03-20", tags: "Photoshop, Illustrator", paymentTerms: "Per Milestone", status: "Completed" },
//   { id: 10, projectName: "Cloud Migration", client: "EnterpriseCorp", deadline: "2024-04-15", tags: "AWS, Kubernetes", paymentTerms: "Hourly", status: "In-progress" },
//   { id: 11, projectName: "iOS App Development", client: "MobileMasters", deadline: "2024-06-01", tags: "Swift, iOS", paymentTerms: "50% Upfront", status: "Ongoing" },
//   { id: 12, projectName: "Cybersecurity Audit", client: "SecureNet", deadline: "2024-03-25", tags: "PenTesting, Firewall", paymentTerms: "Full Payment", status: "Completed" },
//   { id: 13, projectName: "Data Analytics Dashboard", client: "InsightX", deadline: "2024-05-05", tags: "Python, Pandas", paymentTerms: "Monthly", status: "In-progress" },
//   { id: 14, projectName: "Marketing Automation", client: "AutoMarket", deadline: "2024-04-30", tags: "Zapier, HubSpot", paymentTerms: "Per Milestone", status: "Cancelled" },
//   { id: 15, projectName: "E-learning Platform", client: "EduTech", deadline: "2024-06-15", tags: "MERN Stack", paymentTerms: "Full Payment", status: "Ongoing" },
//   { id: 16, projectName: "Real Estate Website", client: "HomeFinder", deadline: "2024-04-20", tags: "React, Firebase", paymentTerms: "50% Upfront", status: "In-progress" },
//   { id: 17, projectName: "Game Development", client: "FunGames", deadline: "2024-07-01", tags: "Unity, C#", paymentTerms: "Hourly", status: "Ongoing" },
//   { id: 18, projectName: "Podcast Editing", client: "TalkStream", deadline: "2024-02-28", tags: "Adobe Audition", paymentTerms: "Per Milestone", status: "Completed" },
//   { id: 19, projectName: "NFT Marketplace", client: "CryptoArt", deadline: "2024-06-30", tags: "Blockchain, React", paymentTerms: "Full Payment", status: "Ongoing" },
//   { id: 20, projectName: "HR Management System", client: "PeopleFirst", deadline: "2024-05-25", tags: "Java, Spring Boot", paymentTerms: "50% Upfront", status: "In-progress" },
// ];

// ------------------------------------

//Earning graphs data

export const EarningsGraphData = [
  { week: "Week 1", project1: 4000, project3: 3500, project4: 1800 },
  { week: "Week 2", project1: 3000, project2: 1800, project3: 4200 },
  {
    week: "Week 3",
    project1: 5000,
    project2: 3200,
    project3: 2800,
    project4: 3300,
  },
  {
    week: "Week 4",
    project1: 4500,
    project2: 2900,
    project3: 3100,
    project4: 4000,
  },
];

export const totalEarnings = 6321.78;
