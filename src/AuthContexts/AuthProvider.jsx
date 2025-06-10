import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config.js";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //Post request for JWT using user Email
      if (currentUser?.email) {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: currentUser?.email,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userSignOut = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const userSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const authData = {
    user,
    setUser,
    createUser,
    userSignOut,
    userSignIn,
    loading,
    setLoading,
    googleSignIn,
    updateUser,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
