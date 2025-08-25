import React from "react";
import login from "../assets/login.svg";
import { Link } from "react-router";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {
  const [signupData, setSignupData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  
  const { signupMutation, isPending, error } = useSignup();
  
  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-200"
      // data-theme="lofi"
    >
      <div
        onSubmit={submitHandler}
        className="bg-base-100 shadow-xl rounded-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left: Image */}
        <div className="h-64 md:h-auto">
          <img src={login} alt="Login" className="object-fit w-full h-full" />
        </div>

        {/* Right: Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center mb-6">
            <span className="inline-flex items-center gap-2">
              Create your account
            </span>
          </h2>

          {error && (
            <div role="alert" className="alert alert-error alert-dash my-4">
              <span>{error?.response?.data?.message}</span>
            </div>
          )}

          <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              value={signupData.fullName}
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={signupData.email}
              required
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={signupData.password}
              placeholder="Password"
              required
              className="input input-bordered w-full"
            />
            <button
              className="btn btn-primary w-full d-flex justify-content-center align-items-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="divider text-sm">or</div>

            <button className="btn btn-outline w-full flex items-center justify-center gap-2">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-hover link-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
