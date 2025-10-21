import { Footer } from "../../navigation/footer/Footer";
import { PageHeader } from "../../navigation/page-header";
import { LoginAndRegistrationMainContainer } from "./components/LoginAndRegistrationMainContainer";

export function Signup() {
  return (
    <div>
      <PageHeader />
      <LoginAndRegistrationMainContainer />
      <Footer />
    </div>
  );
}
