import SignupAds from "./signup-ads/SignupAds";
import RegistrationForm from "./registration-form/RegistrationForm";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import LoginForm from "../../liber-login/LoginForm";

export function LoginAndRegistrationMainContainer() {
  const location = useLocation();

  return (
    <Container>
      <Section className="form">
        {location?.pathname === "/sign-up" ? (
          <RegistrationForm />
        ) : (
          <LoginForm />
        )}
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #fcfcfc;
  border-radius: 60px;
  margin: 2% 3%;
  justify-content: center;

  @media (max-width: 767px) {
    margin: 0;
    border-radius: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  /* RegistrationForm should be on top when stacked */
  &.form {
    order: -1;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;

    &.form {
      order: 1;
    }

    &.ads {
      order: 0;
    }
  }
`;
