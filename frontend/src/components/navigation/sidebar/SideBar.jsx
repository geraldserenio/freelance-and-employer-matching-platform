import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { generateIcon } from "../../shared/icons/generate-icon.jsx";
import { black, white } from "../../shared/styles/color.jsx";
import LinkAndSubLink from "../link-and-sub-link.js";
import { unselectedSubLinkAdmin } from "../../shared/styles/theme.jsx";
import { useSelector } from "react-redux";
import { logout } from "../../../redux/reducer/authReducer.js";
import {
  LinksWithIconContainer,
  LinkIcon,
  StyledLink,
} from "../link-and-sub-link.js";
//import Swal from "sweetalert2";

export const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const isAdmin = true;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const linksWithIconContainerCustomStyle = {
    left: "26px",
    cursor: "pointer",
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // <SideBarContainer>
    //   {isAuthenticated ? (
    //     <LeftBar style={{ backgroundColor: isAdmin ? black : white }}>
    //       <LogoContainer style={{ backgroundColor: isAdmin ? black : white }}>
    //         <Logo src={generateIcon("PKLogo")} />
    //       </LogoContainer>
    //       <LinkAndSubLink />
    //       <LinksWithIconContainer
    //         style={linksWithIconContainerCustomStyle}
    //         onClick={handleLogout}
    //       >
    //         <LinkIcon src={generateIcon("Logout")} />{" "}
    //         <StyledLink
    //           style={{
    //             ...unselectedSubLinkAdmin,
    //           }}
    //         >
    //           Logout
    //         </StyledLink>
    //       </LinksWithIconContainer>
    //     </LeftBar>
    //   ) : null}
    <MainContent>{children}</MainContent>
    // </SideBarContainer>
  );
};

const LeftBar = styled.div`
  width: 20%;
  flex-shrink: 0;
  background: #000;
  color: #a4a4a4;
  position: relative;
`;

const MainContent = styled.div`
  background-color: #fff;
  width: 100%;
`;

const SideBarContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  height: auto;
`;

const LogoContainer = styled.div`
  width: 100%;
  background: #000;
  display: flex;
  align-content: center;
`;

const Logo = styled.img`
  margin: auto;
  margin-top: 47px;
  margin-bottom: 47px;
`;

export const ToggleIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 47px;
  cursor: pointer;
  padding-top: 17px;
  transition: transform 0.4s ease;
`;
