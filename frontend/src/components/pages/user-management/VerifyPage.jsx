import React, { useEffect } from "react";
import { verifyUser } from "../../../services/users/user-services";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../redux/reducer/authReducer";
import { useLocation, useNavigate } from "react-router-dom";

export const VerifyPage = () => {
  const location = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(location.search); // Parse the query string
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const verify = await verifyUser(id, token);
      if (verify?.status === 401) {
        Swal.fire({
          title: "Link Expired!",
          text: "Please, ask for another link.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(logout());
            navigate("/login");
          }
        });
      } else {
        Swal.fire({
          title: "Account verified!",
          text: "Click OK, to go back to dashboard",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard");
          }
        });
      }
    }

    verify();
  }, []);

  return <div></div>;
};
