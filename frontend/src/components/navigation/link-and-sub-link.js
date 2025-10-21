import React from "react";
import { fontFamily, routerLinkAdmin } from "../shared/styles/theme.jsx";
import { gray, tertiary } from "../shared/styles/color.jsx";
import { Link } from "react-router-dom";
import { NavigationLinks } from "./navigation-links.js";
import { extraLarge, medium } from "../shared/styles/sizes.jsx";
import styled from "styled-components";

function LinkAndSubLink() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const role = loggedInUser?.user?.role || "staff";
  return (
    <LinkContainer>
      {NavigationLinks.map((link, index) => {
        const userHasAccess = link?.hasAccess?.includes(role);

        if (userHasAccess) {
          return (
            <ParentLinkContainer key={index}>
              <ParentLink
                style={{
                  backgroundColor: "",
                }}
              >
                <Links key={index}>
                  <LinksWithIconContainer>
                    {/* <LinkIcon src={generateIcon(link.icon)} />{" "} */}
                    <StyledLink>
                      <Link to={link.link} style={routerLinkAdmin}>
                        {link.name === "Users"
                          ? role === "client"
                            ? "Staffs"
                            : "Users"
                          : link.name}
                      </Link>
                    </StyledLink>
                  </LinksWithIconContainer>
                </Links>
              </ParentLink>
            </ParentLinkContainer>
          );
        }
      })}
    </LinkContainer>
  );
}

export default LinkAndSubLink;

const LinkContainer = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: ${extraLarge}px;
  overflow-y: auto;
  height: 378px;
  /* Define the style changes as you scroll down */
  ::-webkit-scrollbar {
    width: 10px; /* Adjust the scrollbar width as needed */
  }

  ::-webkit-scrollbar-thumb {
    background: ${gray}; /* Color of the scrollbar thumb */
  }

  /* Define style changes for the scrollable content */
  .scroll-content {
    background-color: ${tertiary}; /* Initial background color */
    transition: background-color 0.3s ease; /* Transition for smooth color change */
    padding: 10px;
    box-sizing: border-box;
  }

  /* Add styles based on scroll position */
  /* For example, change the background color as you scroll down */
  &:hover .scroll-content {
    background-color: ${tertiary}; /* Change to your desired background color */
  }
`;

const ParentLinkContainer = styled.div`
  display: inline-block;
  width: 92%;
  margin-left: 8%;
`;

const ParentLink = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px 0px 0px 8px;
`;

export const LinkIcon = styled.img`
  width: 26px;
  height: 26px;
  position: absolute;
  top: -4px;
`;

const Links = styled.div`
  padding-top: ${medium + 7}px;
  padding-bottom: ${medium + 3}px;
`;

export const LinksWithIconContainer = styled.div`
  width: 82px;
  margin-left: 14px;
  position: relative;
`;

export const StyledLink = styled.span`
  color: #ffffff;
  font-family: ${fontFamily.font};
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 29px;
  text-decoration: none;
`;

export const ToggleIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 47px;
  cursor: pointer;
  padding-top: 17px;
  transition: transform 0.4s ease;
`;
