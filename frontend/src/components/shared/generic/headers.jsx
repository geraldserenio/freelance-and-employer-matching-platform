import { black, gray } from "../styles/color";
import styled from "styled-components";
import { fontFamily } from "../styles/theme";

export const H1 = styled.h1`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: ${black};
  margin: 0;
`;

export const H2 = styled.h2`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: ${black};
`;

export const H3 = styled.h3`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${gray};
`;

export const SecondaryH1 = styled.h1`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: ${gray};
`;

export const SubHeading = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 2.6em;
  line-height: 36px;
  letter-spacing: 0%;
  text-align: start;
`;

export const ErrorMessage = styled.p`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #b71c1c;
  padding-bottom: 3px;
  padding-top: 3px;
`;

export const HeadingSection = styled.h1`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 40px;
  line-height: 60px;
  letter-spacing: 0%;
  text-align: start;
`;

export const ButtonedHeadingSection = styled.button`
  border: 2px solid #1d1e2b;
  background-color: transparent;
  color: #1d1e2b;
  padding-top: 18px;
  padding-right: 24px;
  padding-bottom: 18px;
  padding-left: 24px;
  border-radius: 100px;
  font-family: ${fontFamily.font};
  font-size: 32px;
`;

export const SubHeadingSection = styled.p`
  font-family: ${fontFamily.font};
  font-weight: 400;
  font-size: 24px;
  color: #118ab2;
`;
