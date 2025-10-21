import React from "react";
import { Graychipset } from "../button/buttonsStyles";

export const CardChipset = ({ chipsetvalue }) => {
  return <Graychipset>{chipsetvalue?.skill?.skill_name}</Graychipset>;
};
