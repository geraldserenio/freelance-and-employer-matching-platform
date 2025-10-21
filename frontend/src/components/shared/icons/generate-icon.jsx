import styled from "styled-components";
import Sum from "../../../assets/icons/Sum.svg";
import Edit from "../../../assets/icons/Edit.svg";
import View from "../../../assets/icons/View.svg";
import Logo from "../../../assets/icons/Logo.svg";
import Dollar from "../../../assets/icons/Dollar.svg";
import Book from "../../../assets/icons/Book.svg";
import Messages from "../../../assets/icons/Messages.svg";
import ShoppingBag from "../../../assets/icons/ShoppingBag.svg";
import Search from "../../../assets/icons/Search.svg";
import Building from "../../../assets/icons/Building.svg";
import Gift from "../../../assets/icons/Gift.svg";
import Users from "../../../assets/icons/Users.svg";
import GraphicDesign from "../../../assets/icons/GraphicDesign.svg";
import WebDevelopment from "../../../assets/icons/WebDevelopment.svg";
import UIUXDesign from "../../../assets/icons/UIUXDesign.svg";
import Marketing from "../../../assets/icons/Marketing.svg";
import SEO from "../../../assets/icons/SEO.svg";
import AIServices from "../../../assets/icons/AIServices.svg";
import EmptyUserIcon from "../../../assets/icons/EmptyUserIcon.svg";
import ClientEmpty from "../../../assets/icons/ClientEmpty.svg";
import Check from "../../../assets/icons/Check.svg";
import EmptyLogo from "../../../assets/icons/EmptyLogo.svg";
import UnitedArabEmiratesMinistryOfEconomy from "../../../assets/icons/moe_logo.svg";
import HowItWorksSelectFreelancers from "../../../assets/icons/HowItWorksSelectFreelancers.svg";
import HowItWorksCollaborate from "../../../assets/icons/HowItWorksCollaborate.svg";
import HowItWorksPostProject from "../../../assets/icons/HowItWorksPostProject.svg";
import HowItWorksPaySecurely from "../../../assets/icons/HowItWorksPaySecurely.svg";
import HowItWorksSignUp from "../../../assets/icons/HowItWorksSignUp.svg";
import HowItWorksBrowse from "../../../assets/icons/HowItWorksBrowse.svg";
import HowItWorksMatch from "../../../assets/icons/HowItWorksMatch.svg";
import HowItWorksGetPaid from "../../../assets/icons/HowItWorksGetPaid.svg";
import CheckGreen from "../../../assets/icons/CheckGreen.svg";
import CheckBlue from "../../../assets/icons/CheckBlue.svg";
import GraphicDesignBlack from "../../../assets/icons/GraphicDesignBlack.svg";
import WebDevelopmentBlack from "../../../assets/icons/WebDevelopmentBlack.svg";
import UIUXBlack from "../../../assets/icons/UIUXBlack.svg";
import ApplyArrow from "../../../assets/icons/ApplyArrow.svg";
import Close from "../../../assets/icons/Close.svg";
import Trash from "../../../assets/icons/Trash.svg";
import Withdraw from "../../../assets/icons/Withdraw.svg";
import UploadProfilePicture from "../../../assets/icons/UploadProfilePicture.svg";
import Decline from "../../../assets/icons/Decline.svg";
import Approve from "../../../assets/icons/Approve.svg";
import Review from "../../../assets/icons/Review.svg";
import AttachImage from "../../../assets/icons/AttachImage.svg";
import Chat from "../../../assets/icons/message-circle-svgrepo-com.svg";
import Milestone from "../../../assets/icons/Milestone.svg";
import SubmitMileston from "../../../assets/icons/SubmitMileston.svg";
import TransferFunds from "../../../assets/icons/TransferFunds.svg";

//images
import Homepage1 from "../../../assets/images/Homepage1.webp";
import Maryam from "../../../assets/images/Maryam.png";
import Sarah from "../../../assets/images/Sarah.png";
import Khalid from "../../../assets/images/Khalid.png";
import FreelancerImage from "../../../assets/images/FreelancerImage.jpg";
import WhyChooseLiberFreelancer from "../../../assets/images/WhyChooseLiberFreelancer.jpg";
import ProjectStats from "../../../assets/images/ProjectStats.png";
import ProjectStatsWhite from "../../../assets/images/ProjectStatsWhite.png";
import WhyLiberSarah from "../../../assets/images/WhyLiberSarah.png";
import AboutUsLeftpic from "../../../assets/images/AboutUsLeftpic.png";
import Library from "../../../assets/images/Library.png";
import LaptopMeeting from "../../../assets/images/LaptopMeeting.png";
import PlantMeeting from "../../../assets/images/PlantMeeting.png";
import TwoPersonMeeting from "../../../assets/images/TwoPersonMeeting.png";
import Conference from "../../../assets/images/Conference.png";
import Earnings from "../../../assets/images/Earnings.png";
import Library1 from "../../../assets/images/Workshop1.jpg";
import WorkshopHeading from "../../../assets/images/WorkshopHeading.jpg";
import NationalCharitySchool from "../../../assets/images/National_Charity_School_Logo_Web_Optimized.png";
import Workshop2 from "../../../assets/images/Workshop2.jpg";
import Workshop3 from "../../../assets/images/Workshop3.jpg";
import Workshop4 from "../../../assets/images/Workshop4.jpg";
import BusinessDashboard from "../../../assets/images/BusinessDashboard.jpg";
import ForBusinessTabWhyChooseLiber from "../../../assets/images/ForBusinessTabWhyChooseLiber.jpg";
import ForFreelancerTabWhyChooseLiber from "../../../assets/images/ForFreelancerTabWhyChooseLiber.jpg";

import { FiChevronDown } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { large } from "../styles/sizes";

export const generateIcon = (icon) => {
  switch (icon) {
    case "Milestone":
      return Milestone;
    case "TransferFunds":
      return TransferFunds;
    case "SubmitMilestone":
      return SubmitMileston;
    case "Chat":
      return Chat;
    case "ForFreelancerTabWhyChooseLiber":
      return ForFreelancerTabWhyChooseLiber;
    case "ForBusinessTabWhyChooseLiber":
      return ForBusinessTabWhyChooseLiber;
    case "BusinessDashboard":
      return BusinessDashboard;
    case "AttachImage":
      return AttachImage;
    case "Review":
      return Review;
    case "Workshop2":
      return Workshop2;
    case "Workshop3":
      return Workshop3;
    case "Workshop4":
      return Workshop4;
    case "NationalCharitySchool":
      return NationalCharitySchool;
    case "Approve":
      return Approve;
    case "Decline":
      return Decline;
    case "Library1":
      return Library1;
    case "WorkshopHeading":
      return WorkshopHeading;
    case "ToggleDown":
      return <FiChevronDown size={large} />;
    case "Close1":
      return <FiX size={large} />;
    case "ApplyArrow":
      return ApplyArrow;
    case "UploadProfilePicture":
      return UploadProfilePicture;
    case "Close":
      return Close;
    case "Trash":
      return Trash;
    case "Withdraw":
      return Withdraw;
    case "ProjectStatsWhite":
      return ProjectStatsWhite;
    case "WhyLiberSarah":
      return WhyLiberSarah;
    case "GraphicDesignBlack":
      return GraphicDesignBlack;
    case "WebDevelopmentBlack":
      return WebDevelopmentBlack;
    case "UIUXBlack":
      return UIUXBlack;
    case "ProjectStats":
      return ProjectStats;
    case "WhyChooseLiberFreelancer":
      return WhyChooseLiberFreelancer;
    case "CheckGreen":
      return CheckGreen;
    case "CheckBlue":
      return CheckBlue;
    case "HowItWorksPaySecurely":
      return HowItWorksPaySecurely;
    case "HowItWorksSignUp":
      return HowItWorksSignUp;
    case "HowItWorksBrowse":
      return HowItWorksBrowse;
    case "HowItWorksMatch":
      return HowItWorksMatch;
    case "HowItWorksGetPaid":
      return HowItWorksGetPaid;
    case "HowItWorksPostProject":
      return HowItWorksPostProject;
    case "HowItWorksCollaborate":
      return HowItWorksCollaborate;
    case "HowItWorksSelectFreelancers":
      return HowItWorksSelectFreelancers;
    case "FreelancerImage":
      return FreelancerImage;
    case "UnitedArabEmiratesMinistryOfEconomy":
      return UnitedArabEmiratesMinistryOfEconomy;
    case "EmptyLogo":
      return EmptyLogo;
    case "Check":
      return Check;
    case "ClientEmpty":
      return ClientEmpty;
    case "EmptyUserIcon":
      return EmptyUserIcon;
    case "Maryam":
      return Maryam;
    case "Sarah":
      return Sarah;
    case "Khalid":
      return Khalid;
    case "GraphicDesign":
      return GraphicDesign;
    case "WebDevelopment":
      return WebDevelopment;
    case "UIUXDesign":
      return UIUXDesign;
    case "Marketing":
      return Marketing;
    case "AIServices":
      return AIServices;
    case "SEO":
      return SEO;
    case "Search":
      return Search;
    case "Building":
      return Building;
    case "Gift":
      return Gift;
    case "Users":
      return Users;
    case "Add":
      return Sum;
    case "Edit":
      return Edit;
    case "View":
      return View;
    case "Logo":
      return Logo;
    case "Homepage1":
      return Homepage1;
    case "Dollar":
      return Dollar;
    case "Book":
      return Book;
    case "Messages":
      return Messages;
    case "ShoppingBag":
      return ShoppingBag;
    case "AboutUsLeftpic":
      return AboutUsLeftpic;
    case "Library":
      return Library;
    case "LaptopMeeting":
      return LaptopMeeting;
    case "PlantMeeting":
      return PlantMeeting;
    case "TwoPersonMeeting":
      return TwoPersonMeeting;
    case "Conference":
      return Conference;
    case "Earnings":
      return Earnings;

    default:
      return EmptyLogo;
  }
};

export const Icon = styled.img`
  height: 20px;
  width: 20px;
`;
