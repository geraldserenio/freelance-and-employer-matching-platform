import styled from "styled-components";
import { pagePadding } from "../styles/sizes";
import { white } from "../styles/color";

export const PageContainer = styled.div`
  padding: ${pagePadding}px;
  background-color: ${white};
  height: 100vh;
`;
