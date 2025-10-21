import { signupAd } from "../../../../../assets/s3Assets";
import styled from "styled-components";

const SignupAds = () => {
  return (
    <AdContainer>
      <AdImage src={signupAd} alt="Signup Ad" />
    </AdContainer>
  );
};

export default SignupAds;

const AdContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AdImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures it fills the container while maintaining aspect ratio */
  border-radius: 60px;
`;
