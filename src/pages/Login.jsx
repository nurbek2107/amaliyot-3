import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const { loginWithEmail, signUpWithGoogle } = useLogin();
  const [error, setError] = useState(null);

  const handleLogin = async (values) => {
    const { email, password } = values;

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      await loginWithEmail(email, password);
      // Redirect or other actions upon successful login
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please check your credentials.");
      } else if (error.code === "auth/wrong-password") {
        setError("Invalid password. Please try again.");
      } else {
        setError("Error signing in. Please try again later.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signUpWithGoogle();
      // Redirect or other actions upon successful Google sign-in
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setError("Error signing in with Google. Please try again.");
    }
  };

  return (
    <div className="mt-24">
      <div className="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center">Brand</h2>
          <p className="text-xl text-center">Welcome back!</p>
          <Form onSubmit={handleLogin}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="mt-4">
                {error && (
                  <div className="text-red-500 text-center mb-4">{error}</div>
                )}
                <div className="mt-4">
                  <FormInput
                    type="email"
                    labelText="Email:"
                    name="email"
                    required
                  />
                </div>
                <div className="mt-4">
                  <FormInput
                    type="password"
                    labelText="Password:"
                    name="password"
                    required
                  />
                </div>
                <button
                  className="btn btn-active font-bold py-2 px-4 w-full rounded mt-8"
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}
          </Form>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center mt-4 rounded-lg shadow-md btn btn-active w-full"
          >
            <svg className="h-6 w-6" viewBox="0 0 40 40">
              {/* SVG path for Google sign-in button */}
            </svg>
            <span className="px-4 py-3 text-center font-bold">
              Sign in with Google
            </span>
          </button>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="/register" className="text-xs text-gray-500 uppercase">
              or Register
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
