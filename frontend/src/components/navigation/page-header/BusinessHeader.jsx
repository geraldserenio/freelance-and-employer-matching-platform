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
import { useState } from "react";
import { useEffect } from "react";
import { getPendingProjectMilestoneByIdService } from "../../../services/project-milestone-service/project-milestone-service";
import { primaryColor } from "../../shared/styles/color";
import NotificationBell from "../../shared/notification-bell/NotificationBell";
import { gap } from "../../shared/styles/sizes";

export const BusinessHeader = (props) => {
  const { fetchFlag } = props;
  const user_type = JSON.parse(localStorage.getItem("userData"))?.user
    ?.user_type;
  const navigate = useNavigate();
  const [needsRevision, setNeedsRevision] = useState(false);
  const notifications = [
    {
      title: "Milestone Submitted",
      message: "",
      url: "/gig-proposals",
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
      const result = await getPendingProjectMilestoneByIdService();
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

          {user_type === "business" && (
            <HeaderLink onClick={() => navigate("/projects")}>
              Projects
            </HeaderLink>
          )}

          <HeaderLink onClick={() => navigate("/job-listings")}>
            Job Listings
          </HeaderLink>
          {user_type === "business" && <HeaderLink>Reviews</HeaderLink>}
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
