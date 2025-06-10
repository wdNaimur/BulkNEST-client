import axios from "axios";
import { use } from "react";
import { AuthContext } from "../AuthContexts/AuthContext";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, userSignOut } = use(AuthContext);
  const token = user?.accessToken;
  //intercept  requests
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  //intercept responses
  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.status === 401 || error.status === 403) {
        //logout
        userSignOut()
          .then(() => {
            toast.error(
              `You are logged out because of an error with ${error.status} code.`
            );
          })
          .catch((error) => console.log(error));
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosSecure;
