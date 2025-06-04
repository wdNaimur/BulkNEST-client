import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import ErrorText from "../UI/ErrorText";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContexts/AuthContext";

const SignUpPage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Sign Up";
  }, []);

  const { createUser, setUser, updateUser, googleSignIn, user } =
    useContext(AuthContext);

  const [nameError, setNameError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const validatePassword = (password) => {
    return {
      lengthValid: password.length >= 8 && password.length <= 16,
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const url = form.url.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    const checks = validatePassword(password);
    if (
      !checks.lengthValid ||
      !checks.hasLower ||
      !checks.hasUpper ||
      !checks.hasNumber ||
      !checks.hasSpecial
    ) {
      setErrorPassword("Password must fulfill all requirements.");
      return;
    } else {
      setErrorPassword("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    } else {
      setConfirmPasswordError("");
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({
          displayName: name,
          photoURL: url,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: url });
            toast.success("Successfully Created Account!");
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((error) => {
            setUser(user);
            toast.error("Failed to Created Account!");
          });
      })
      .catch((error) => {
        toast.error("Failed to Created Account!");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        toast.success("Successfully Created Account!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error("Failed to Created Account!");
      });
  };
  console.log(user);
  const passwordChecks = validatePassword(passwordInput);
  if (user) {
    return (
      <div className="container mx-auto px-4 font-poppins">
        <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
          <h1 className="text-4xl font-grand-hotel text-center text-primary">
            Please Logout First
          </h1>
          <p className="text-center w-8/12 mx-auto opacity-80">
            You are already logged in. To create a new account, please logout
            first.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 flex gap-10 items-center justify-center select-none my-10 font-poppins">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-4xl font-bold lg:text-5xl text-primary">
              Sign Up
            </h2>
            <form onSubmit={handleSignUp} className="fieldset">
              {/* Name */}
              <label className="label text-primary">Name</label>
              <input
                name="name"
                type="text"
                className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                placeholder="Name"
                required
              />
              {nameError && <ErrorText>{nameError}</ErrorText>}

              {/* Photo URL */}
              <label className="label text-primary">Photo URL</label>
              <input
                name="url"
                type="url"
                className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                placeholder="Photo URL"
                required
              />

              {/* Email */}
              <label className="label text-primary">Email</label>
              <input
                name="email"
                type="email"
                className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                placeholder="Email"
                required
              />

              {/* Password */}
              <label className="label text-primary">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <a
                  onClick={handleTogglePassword}
                  className="absolute right-4 cursor-pointer top-1/2 z-50 -translate-y-[50%]"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </a>
              </div>
              {/* Password Rules */}
              <div className="text-xs mt-1 ml-1 space-y-1 text-left">
                <p
                  className={
                    passwordChecks.lengthValid
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  ✓ 8–16 characters in length
                </p>
                <p
                  className={
                    passwordChecks.hasLower ? "text-green-600" : "text-gray-400"
                  }
                >
                  ✓ Lower case letter
                </p>
                <p
                  className={
                    passwordChecks.hasUpper ? "text-green-600" : "text-gray-400"
                  }
                >
                  ✓ Upper case letter
                </p>
                <p
                  className={
                    passwordChecks.hasNumber
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  ✓ Numeric character
                </p>
                <p
                  className={
                    passwordChecks.hasSpecial
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  ✓ Special character
                </p>
              </div>
              {errorPassword && <ErrorText>{errorPassword}</ErrorText>}

              {/* Confirm Password */}
              <label className="label text-primary">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                placeholder="Confirm Password"
                required
              />
              {confirmPasswordError && (
                <ErrorText>{confirmPasswordError}</ErrorText>
              )}

              <button
                type="submit"
                className="btn btn-secondary mt-4 text-base-100 w-full"
              >
                Sign Up
              </button>

              <div className="pt-5 border-secondary/40 border-t-2 border-dashed mt-4">
                <a
                  onClick={handleGoogleSignIn}
                  className="btn bg-white text-black border-secondary/20 shadow-sm shadow-secondary/20 w-full"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Sign In with Google
                </a>
              </div>

              <div className="text-sm pt-4 text-center">
                <p>
                  Already have an Account?{" "}
                  <Link
                    to="/signIn"
                    className="link link-hover text-primary font-semibold"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default SignUpPage;
