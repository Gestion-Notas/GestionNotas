import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import Restricted from "./Restricted";
import Axios from "../libs/axios";
function RequireAdmin() {
  const [auth, Setauth] = useAuthContext();
  const location = useLocation();
  let isLoading = false;
  if (!auth.auth && localStorage.getItem("auth") !== null) {
    isLoading = true;
    Axios
      .get("/auth")
      .then((res) => {
        Setauth(
          res.status === 200
            ? {
                auth: true,
                token: res.data.token,
                data: res.data.user,
              }
            : () => {
                localStorage.removeItem("auth");
                return { auth: false, token: null, data: null };
              }
        );
        isLoading = false;
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("auth");
        Setauth({ auth: false, token: null, data: null });
        isLoading = false;
      });
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return auth.data.Tipo == 2 ? (
    <Outlet />
  ) : auth?.auth ? (
    <Restricted />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
}

export default RequireAdmin;
