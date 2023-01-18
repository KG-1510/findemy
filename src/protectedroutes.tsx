import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = (): JSX.Element => {
  const [cookies, _] = useCookies(["authToken"]);
  return cookies?.authToken ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
      {toast.error("User not authorized! Please login to continue", {
        toastId: "unauthorized",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "font-DMSans",
      })}
    </>
  );
};

export default ProtectedRoute;
