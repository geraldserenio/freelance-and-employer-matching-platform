import styled from "styled-components";
import { large } from "../styles/sizes.jsx";
import { black, primaryColor, white } from "../styles/color.jsx";
import { fontFamily } from "../styles/theme.jsx";

export const PrimaryButton = styled.button`
  width: 93px;
  height: 43px;
  border-radius: 100px;
  padding: 12px 16px 12px 16px;
  background-color: ${primaryColor};
`;

export const SignUpButton = styled.button`
  width: 93px;
  height: 43px;
  border-radius: 100px;
  padding: 12px 16px 12px 16px;
  background-color: ${primaryColor};
`;

export const SecondaryButton = styled.button`
  -webkit-tap-highlight-color: transparent;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  height: 38px;
  border-radius: 5px;
  padding: 0 14px;
  text-transform: unset;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
  line-height: 18px;
  border: 0;
  width: 141px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${large}px;
  background-color: ${black};
  &:hover {
    background-color: ${white};
    color: ${black};
  }
`;

export const CommonButton = styled.button`
  font-family: ${fontFamily.font};
  font-weight: 500;
  font-size: 18px;
  width: auto;
  border-radius: 100px;
  padding-top: 16px;
  padding-right: 30px;
  padding-bottom: 16px;
  padding-left: 30px;
  background-color: ${primaryColor};
  border: 0;
  color: ${white};
  cursor: pointer;
`;
