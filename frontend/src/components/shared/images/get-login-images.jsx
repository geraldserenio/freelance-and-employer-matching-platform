import LogoOnly from "../../../../../assets/images/logo_only.png";
import LoginDesign1 from "../../../../../assets/images/login_design1.png";
import LoginDesign2 from "../../../../../assets/images/login_design2.png";

export const getLoginImages = (images) => {
  switch (images) {
    case "LoginDesign1":
      return LoginDesign1;
    case "LoginDesign2":
      return LoginDesign2;
    case "LogoOnly":
      return LogoOnly;
    default:
      return LogoOnly;
  }
};
