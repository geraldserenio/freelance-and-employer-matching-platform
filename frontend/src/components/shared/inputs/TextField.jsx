import styled from "styled-components";
import { black } from "../styles/color";

export const InputField = styled.input`
  padding: 0 17px;
  background: #ffffff;
  box-shadow:
    1px 1px 2px rgb(255 255 255 / 30%),
    -1px -1px 2px rgb(237 237 237 / 50%),
    inset -3px 3px 6px rgb(237 237 237 / 20%),
    inset 3px -3px 6px rgb(237 237 237 / 20%),
    inset -3px -3px 6px rgb(255 255 255 / 90%),
    inset 3px 3px 8px rgb(237 237 237 / 90%);
  border-radius: 5px;
  height: 40px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  border: white solid 1px;
  color: ${black};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: block;
`;
