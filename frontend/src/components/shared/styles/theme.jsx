import styled from "styled-components";

export const theme = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
};

export const routerLinkAdmin = {
  textDecoration: "none",
  color: "#A4A4A4",
};

export const routerLinkAdminSelected = {
  textDecoration: "none",
  color: "#FFF",
};

export const selectedSubLinkAdmin = {
  textDecoration: "none",
  color: "#E87841",
};

export const unselectedSubLinkAdmin = {
  textDecoration: "none",
  color: "#A4A4A4",
};

export const fontFamily = {
  font: "Poppins",
  title: "circular",
  fontSemiBold: "circular",
};

export const MainTitle = styled.h1`
  color: #000;
  font-size: 40px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  font-family: ${fontFamily.fontSemiBold};
`;

export const SubTitle = styled.span`
  color: var(--Gray, #a4a4a4);
  font-family: ${fontFamily.fontSemiBold};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
