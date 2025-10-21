import { useEffect } from "react";
import { Signup } from "../signup";
import { useNavigate } from "react-router-dom";

export default function LiberLogin() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, []);

  return <Signup />;
}
