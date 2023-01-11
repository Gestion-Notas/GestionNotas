import Axios from "axios"
const axios = Axios.create({
  baseURL: `http://${import.meta.env.VITE_HOSTAPI}`,
  timeout: 1000,
  headers: {
    authorization: "Bearer " + "Cookie.get(userID)"
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // default
  },
});
export default axios;
