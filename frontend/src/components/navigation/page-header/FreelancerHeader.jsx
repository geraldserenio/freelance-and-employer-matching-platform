import React from "react";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { useNavigate } from "react-router-dom";
import {
  HeaderLink,
  LinksAndIconContainer,
  LinksContainer,
  PageHeaderContainer,
} from "./PageHeader";
import UserMenu from "../../pages/Dashboard/UserMenu";
import NotificationBell from "../../shared/notification-bell/NotificationBell";
import { gap } from "../../shared/styles/sizes";
import { primaryColor } from "../../shared/styles/color";
import { useEffect } from "react";
import { getNeedsRevisionProjectMilestoneByIdService } from "../../../services/project-milestone-service/project-milestone-service";
import { useState } from "react";

export const FreelancerHeader = (props) => {
  const { fetchFlag } = props;
  const navigate = useNavigate();
  const [needsRevision, setNeedsRevision] = useState(false);
  const notifications = [
    {
      title: "Milestone Revision Needed",
      message: "",
      url: "/gigs",
    },
    // {
    //   title: "New message",
    //   message: "You have a new message from Jane.",
    //   url: "/messages",
    // },
    // {
    //   title: "Invoice ready",
    //   message: "Your invoice for July is now available.",
    //   url: "/invoices",
    // },
  ];

  useEffect(() => {
    async function fetchNeedsRevision() {
      const result = await getNeedsRevisionProjectMilestoneByIdService();
      setNeedsRevision(result?.data?.result?.data);
    }
    fetchNeedsRevision();
  }, [fetchFlag]);

  return (
    <PageHeaderContainer>
      <LinksAndIconContainer>
        <Icon
          onClick={() => navigate("/")}
          style={{ height: "40px", width: "40px", cursor: "pointer" }}
          src={generateIcon("Logo")}
        />
        <LinksContainer>
          <HeaderLink onClick={() => navigate("/dashboard")}>
            Dashboard
          </HeaderLink>
          <HeaderLink onClick={() => navigate("/projects")}>
            Projects
          </HeaderLink>
          <HeaderLink onClick={() => navigate("/job-listings")}>
            Job Listings
          </HeaderLink>
          <HeaderLink>Reviews</HeaderLink>
        </LinksContainer>
      </LinksAndIconContainer>
      <div style={{ display: "flex", gap: gap, alignItems: "center" }}>
        <NotificationBell
          notifications={!needsRevision ? [] : notifications}
          borderColor={primaryColor}
        />
        <UserMenu />
      </div>
    </PageHeaderContainer>
  );
};
