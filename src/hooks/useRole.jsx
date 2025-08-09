import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../context/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;
    const fetchUserRole = async () => {
      setIsRoleLoading(true);
      try {
        const response = await axiosSecure.get(`/user/role/${user.email}`);
        setRole(response.data?.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setIsRoleLoading(false);
      }
    };
    fetchUserRole();
  }, [user?.email, axiosSecure]);
  return [role, isRoleLoading];
};

export default useRole;
