import React, { useState } from "react";
import styled from "styled-components";
import { FaSignOutAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { gray } from "../../shared/styles/color";
import { fontFamily } from "../../shared/styles/theme";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/reducer/authReducer";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../helper/base-url";
import { generateIcon } from "../../shared/icons/generate-icon";

const UserMenu = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Toggle onClick={() => setOpen(!open)}>
        <Avatar
          src={
            loggedInUser?.user?.photo != ""
              ? `${BASE_URL}uploads/${loggedInUser?.user?.photo}`
              : generateIcon("EmptyLogo")
          }
          alt="User"
        />
        <FiChevronDown />
      </Toggle>

      {open && (
        <Dropdown>
          <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          {loggedInUser?.user?.user_type === "admin" && (
            <MenuItem onClick={() => navigate("/subscribers")}>
              Subscribers
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate("/messages")}>Messages</MenuItem>
          {loggedInUser?.user?.user_type !== "business" && (
            <MenuItem onClick={() => navigate("/payments")}>Payments</MenuItem>
          )}
          {loggedInUser?.user?.user_type === "business" && (
            <MenuItem onClick={() => navigate("/gig-proposals")}>
              Gig proposals
            </MenuItem>
          )}
          {loggedInUser?.user?.user_type === "freelancers" && (
            <MenuItem onClick={() => navigate("/gigs")}>Gigs</MenuItem>
          )}
          {loggedInUser?.user?.user_type === "business" && (
            <MenuItem onClick={() => navigate("/jobs")}>Jobs</MenuItem>
          )}
          {loggedInUser?.user?.user_type === "freelancers" && (
            <MenuItem onClick={() => navigate("/job-applications")}>
              Job applications
            </MenuItem>
          )}
          {loggedInUser?.user?.user_type === "freelancers" && (
            <MenuItem onClick={() => navigate("/freelancer-courses")}>
              Courses
            </MenuItem>
          )}
          {loggedInUser?.user?.user_type === "admin" && (
            <MenuItem onClick={() => navigate("/publish-requests")}>
              Publish Requests
            </MenuItem>
          )}
          {loggedInUser?.user?.user_type === "admin" && (
            <MenuItem onClick={() => navigate("/gig-payments")}>
              Gig Payments
            </MenuItem>
          )}
          <MenuItem
            danger
            onClick={() => {
              dispatch(logout());
            }}
          >
            <FaSignOutAlt style={{ color: "#e00" }} />
            Sign out
          </MenuItem>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default UserMenu;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 160px;
  z-index: 100;
`;

const MenuItem = styled.div`
  font-family: ${fontFamily.font};
  padding: 12px 16px;
  font-size: 15px;
  color: ${({ danger }) => (danger ? "#e00" : "#333")};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  ${({ danger }) =>
    danger &&
    `
    font-weight: bold;
  `}
  border-bottom: 1px solid ${gray};
`;
