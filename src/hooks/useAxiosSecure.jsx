import axios from "axios";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, userSignOut } = useContext(AuthContext);

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    // Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          toast.error(`You are logged out due to ${status} error.`);
          userSignOut()
            .then(() => {
              toast.error(`You are logged out due to ${status} error.`);
            })
            .catch((err) => console.error(err));
        }
        return Promise.reject(error);
      }
    );

    // Cleanup to prevent duplicate interceptors
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, userSignOut]);
  return axiosInstance;
};

export default useAxiosSecure;
