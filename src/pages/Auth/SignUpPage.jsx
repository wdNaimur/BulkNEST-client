import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion, useInView } from "framer-motion";
import ErrorText from "../../components/common/ErrorText";
import { AuthContext } from "../../context/AuthContext";
import { saveUserInDB } from "../../api/utils";

const SignUpPage = () => {
  const { createUser, setUser, updateUser, googleSignIn, user } =
    useContext(AuthContext);
  useEffect(() => {
    document.title = `BulkNEST | ${user?.email ? "Signed Up" : "Sign Up"}`;
    window.scrollTo(0, 0);
  }, [user?.email]);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -40px 0px",
  });

  const [nameError, setNameError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

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

  const handleSignUp = async (e) => {
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

    try {
      const res = await createUser(email, password);
      const user = res.user;

      try {
        await updateUser({
          displayName: name,
          photoURL: url,
        });
        setUser({ ...user, displayName: name, photoURL: url });

        // for backend database
        const userData = {
          name: name,
          email: email,
          image: url,
        };
        // Save user data in database
        await saveUserInDB(userData);
        toast.success("Successfully Created Account!");
        setShowPasswordRules(false);
        navigate(from);
      } catch (updateError) {
        setUser(user);
        toast.error("Failed to update user profile!");
      }
    } catch (createError) {
      toast.error("Failed to Create Account!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      //update user data in database
      await saveUserInDB(userData);
      toast.success("Successfully Created Account!");
      navigate(from);
    } catch (error) {
      toast.error("Failed to Create Account!");
    }
  };

  const passwordChecks = validatePassword(passwordInput);

  if (user) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
        }
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="container mx-auto px-4 font-poppins"
      >
        <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
          <h1 className="text-4xl font-grand-hotel text-center text-primary">
            Please Logout First
          </h1>
          <p className="text-center  mx-auto opacity-80">
            You are already logged in. To create a new account, please logout
            first.
          </p>
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
        }
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="container mx-auto px-4 flex gap-10 items-center justify-center select-none my-10 font-poppins"
      >
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl shadow-primary/10  border-2 border-primary/10 ">
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
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setShowPasswordRules(true);
                    setErrorPassword("");
                  }}
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

              {/* Password Rules (show only one error at a time) */}
              {showPasswordRules && (
                <div className="text-xs mt-1 ml-1 text-left text-red-500">
                  {!passwordChecks.lengthValid && (
                    <p>✗ Password must be 8–16 characters</p>
                  )}
                  {passwordChecks.lengthValid && !passwordChecks.hasLower && (
                    <p>✗ Must include a lowercase letter</p>
                  )}
                  {passwordChecks.lengthValid &&
                    passwordChecks.hasLower &&
                    !passwordChecks.hasUpper && (
                      <p>✗ Must include an uppercase letter</p>
                    )}
                  {passwordChecks.lengthValid &&
                    passwordChecks.hasLower &&
                    passwordChecks.hasUpper &&
                    !passwordChecks.hasNumber && <p>✗ Must include a number</p>}
                  {passwordChecks.lengthValid &&
                    passwordChecks.hasLower &&
                    passwordChecks.hasUpper &&
                    passwordChecks.hasNumber &&
                    !passwordChecks.hasSpecial && (
                      <p>✗ Must include a special character</p>
                    )}
                </div>
              )}
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
                  className="btn bg-white text-black border-primary/15 shadow-sm shadow-primary/15 w-full"
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
                    state={{ from }}
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
      </motion.div>
    );
  }
};

export default SignUpPage;
