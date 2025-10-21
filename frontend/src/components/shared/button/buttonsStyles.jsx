import styled from "styled-components";
import { liberGrey, primaryColor } from "../styles/color";

export const Graychipset = styled.div`
  display: inline-flex; /* Ensures it only takes up as much space as needed */
  width: fit-content; /* Limits width to content */
  max-width: max-content;
  border-radius: 100px;
  color: white;
  padding: 8px 12px;
  background-color: ${liberGrey};
  white-space: nowrap; /* Prevents text from wrapping */
`;

export const PrimaryButtonStyle = styled.button`
  height: 43px;
  border-radius: 25px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border: none;
  background-color: ${primaryColor};
`;

export const SecondaryButtonStyle = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  display: inline-block;
  align-items: center;
  justify-content: center;
  color: #118ab2;
  background-color: #ffffff;
  border: 1px solid #118ab2;
  border-radius: 25px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  width: auto; /* Ensures the button is only as wide as its content */

  &:hover {
    background-color: #118ab2;
    color: #ffffff;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const SubmitButtonStyle = styled.button`
  //   width: 65px;
  //   height: 27px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
  //   line-height: 27px;
  //   letter-spacing: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: var(--Liber-Primary-Blue, #118ab2);
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
