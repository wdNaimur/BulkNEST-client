import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContexts/AuthContext";

const SignInPage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Sign In";
  }, []);

  const { userSignIn, googleSignIn, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const handleTogglePassword = () => {
    return setShowPassword(!showPassword);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state?.fromPrivateRoute) {
      toast.error("Access Denied. Please sign in.");
    }
  }, [location]);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userSignIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.error("Login Failed");
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        toast.success("Login Successful");
        navigate(`${location.state ? location.state.from : "/"}`);
      })
      .catch((error) => {
        toast.error("Login Failed");
      });
  };
  if (user) {
    return (
      <div className="container mx-auto px-4 font-poppins">
        <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
          <h1 className="text-4xl font-grand-hotel text-center text-primary">
            Please Logout First
          </h1>
          <p className="text-center w-8/12 mx-auto opacity-80">
            You are already logged in. To log in with a different account,
            please logout first.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 flex justify-center select-none my-10 font-poppins">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-secondary/5 border-2">
          <div className="card-body">
            <div>
              <h2 className="text-4xl font-bold lg:text-5xl text-primary">
                Sign In
              </h2>
            </div>
            <form onSubmit={handleSignIn} className="fieldset">
              <label className="label text-primary">Email</label>
              <input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                placeholder="Email"
              />

              <label className="label text-primary">Password</label>
              <div className=" relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                  placeholder="Password"
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

              <div className="space-y-1">
                {error && <p className="text-red-700">{error}</p>}

                <Link
                  to="/forgot-password"
                  state={{ state: { email } }}
                  className="link link-hover text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-secondary mt-4 text-base-100"
              >
                Sign In
              </button>
              <div className="pt-5 border-secondary/40 border-t-2 border-dashed mt-4 ">
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
              <div className=" text-sm pt-4 gap-0 mx-auto">
                <p className="m-0">
                  Don't have an Account?{" "}
                  <Link
                    to="/signUp"
                    className="link link-hover text-primary font-semibold ml-1"
                  >
                    Sign Up now
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

export default SignInPage;
