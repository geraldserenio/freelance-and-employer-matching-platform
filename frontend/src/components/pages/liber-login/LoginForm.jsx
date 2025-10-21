import { Formik } from "formik";
import {
  StyledForm,
  Title,
} from "../signup/components/registration-form/RegistrationForm";
import {
  loginFormFields,
  loginInitialValues,
  loginValidationSchema,
} from "./loginSchema";
import styled from "styled-components";
import { primaryColor } from "../../shared/styles/color";
import LoginField from "../../shared/inputs/LoginField";
import { googleLogo } from "../../../assets/s3Assets";
import CustomCheckbox from "../../shared/checkbox/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../../services/authenticate";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/reducer/authReducer";
import { useState } from "react";
import { ErrorMessage } from "../../shared/generic/headers";
import { useDeviceInfo } from "../../../helper/deviceInfo";
import Swal from "sweetalert2";
import { ButtonSpinner } from "../../shared/loading/LoadingScreen";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const deviceInfo = useDeviceInfo();
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Card>
        <TitleCentered>Log in</TitleCentered>
        {/* <GoogleButton>
          <GoogleIcon src={googleLogo} alt="Google Logo" />
          Log in with Google
        </GoogleButton>
        <Divider>
          <Line />
          <span>or</span>
          <Line />
        </Divider> */}
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            values.deviceId = deviceInfo?.fingerprintId;
            values.deviceName = deviceInfo?.deviceName;
            setLoading(true);
            const response = await authenticate(values);
            if (response?.status === 200) {
              setLoginErrorMessage("");
              dispatch(login(response?.data));

              switch (response?.data?.user?.step) {
                case 1:
                  Swal.fire({
                    title: "First time logged in.",
                    text: "Choose plan",
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/subscribe");
                    }
                  });
                  break;
                case 2:
                  Swal.fire({
                    title: "Complete your profile",
                    text: "Please, complete your profile",
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/register/freelancer/profile");
                    }
                  });
                  break;
                default:
                  navigate("/dashboard");
                  break;
              }

              setLoading(false);
            } else {
              setLoading(false);
              setLoginErrorMessage(response?.data?.message);
            }
          }}
        >
          {({ values }) => (
            <StyledForm autoComplete="off">
              {loginFormFields.map((field) => (
                <LoginField key={field.name} width="100%" {...field} />
              ))}
              <OptionsRow>
                <CustomCheckbox
                  name="rememberMe"
                  label="Remember me for 30 days"
                />
                <ForgotPassword>Forgot password</ForgotPassword>
              </OptionsRow>
              {loginErrorMessage && (
                <ErrorMessage>{loginErrorMessage}</ErrorMessage>
              )}
              <LoginButton>
                {loading ? <ButtonSpinner /> : "Log in"}
              </LoginButton>
            </StyledForm>
          )}
        </Formik>
        <SignupPrompt>
          Don't have an account?{" "}
          <SignupLink onClick={() => navigate("/sign-up")}>
            Create an account
          </SignupLink>
        </SignupPrompt>
      </Card>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  min-height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 768px) {
    padding: 5% 5%;
  }
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 60px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 2em;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const TitleCentered = styled(Title)`
  text-align: center;
`;

const GoogleButton = styled.button`
  width: 100%;
  border: 1px solid #99aebb;
  background: white;
  padding: 1em;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const GoogleIcon = styled.img`
  height: 20px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: #99aebb;
  font-weight: 500;
  font-size: 14px;
`;

const Line = styled.hr`
  flex-grow: 1;
  border: none;
  border-top: 1px solid #99aebb;
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ForgotPassword = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  padding-bottom: 4px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  font-size: 16px;
  height: 43px;
  border-radius: 100px;
  padding: 12px 16px;
  background-color: ${primaryColor};
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupPrompt = styled.div`
  margin-bottom: 2em;
`;

const SignupLink = styled.span`
  border-bottom: 1px solid black;
  cursor: pointer;
`;
