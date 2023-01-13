import Axios from "axios"
const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_HOSTAPI}`,
  timeout: 1000,
  headers: {
    authorization: "Bearer " + localStorage.getItem("auth")
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // default
  },
  
});
axios.defaults.withCredentials = true;
export default axios;
