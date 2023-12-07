import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import MainPage from "../pages/MainPage";
import Restricted from "./Restricted";
import Axios from "../libs/axios";
function RequireMaestro() {
  const location = useLocation();
  const [auth, Setauth] = useAuthContext();
  let isLoading = false;
  if (!auth.auth && localStorage.getItem("auth") !== null) {
    isLoading = true;
    Axios.get("/auth")
      .then((res) => {
        Setauth(
          res.status === 200
            ? {
                auth: true,
                token: res.data.token,
                userdata: res.data.userdata,
              }
            : () => {
                localStorage.removeItem("auth");
                return { auth: false, token: null, userdata: null };
              }
        );
        isLoading = false;
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("auth");
        Setauth({ auth: false, token: null, userdata: null });
        isLoading = false;
      });
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return !auth.auth ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : auth.userdata.Tipo == 0 ? (
    <Outlet />
  ) : (
    <MainPage Main={Restricted}/>
  );
}

export default RequireMaestro;
