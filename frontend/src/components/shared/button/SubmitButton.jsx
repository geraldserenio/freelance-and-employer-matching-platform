import React from "react";
import { SubmitButtonStyle } from "./buttonsStyles";

export default function SubmitButton({
  children = "Submit",
  disabled = false,
}) {
  return (
    <SubmitButtonStyle onClick={() => null} type="submit" disabled={disabled}>
      {children}
    </SubmitButtonStyle>
  );
}
