import React from "react";
import loginsvg from "../assets/login.svg";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  
  const {loginMutation, isPending, error} = useLogin()

  const loginHandler = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-200"
      // data-theme="lofi"
    >
      <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* Left: Image */}
        <div className="h-64 md:h-auto">
          <img
            src={loginsvg}
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center mb-6">
            <span className="inline-flex items-center gap-2">
              Login to your account
            </span>
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <a href="#" className="link link-hover text-sm">
                Forgot password?
              </a>
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={loginHandler}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {error && (
            <div role="alert" className="alert alert-error alert-dash my-4">
              <span>{error?.response?.data?.message}</span>
            </div>
          )}


            <div className="divider text-sm">or</div>

            <button className="btn btn-outline w-full flex items-center justify-center gap-2">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login with Google
            </button>

            <p className="text-center text-sm mt-4">
              <Link
                to="/signup"
                className="link link-hover link-primary underline"
              >
                Create new account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
