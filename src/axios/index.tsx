import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

const instance = axios.create({
   baseURL: "https://api.softstructures.co",
});

instance.interceptors.request.use((request) => {
   // add auth header with jwt if account is logged in and request is to the api url

   if (token && request.headers) {
       request.headers.Authorization = `Bearer ${token}`;
   }

   return request;
});

export default instance;
