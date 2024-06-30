//icons
import { FcGoogle } from "react-icons/fc";
//rrd
import { Form, Link, useActionData } from "react-router-dom";
//components
import { FormInput } from "../components";

//hooks
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};
function Register() {
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();
  useEffect(() => {
    if (userData) {
      signInWithEmail(userData.email,userData.password);
    }
  }, [userData]);
  return (
    <div className="min-h-screen grid place-items-center p-4"> 
      <Form
        method="post"
        className="w-96 p-6 border border-gray-500 rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center">Brand</h2>
        <p className="text-xl text-center">Welcome!</p>
        <FormInput type="email" name="email" labelText="Email:" />
        <FormInput type="password" name="password" labelText="Password: " />
        <div className="mt-6">
          {!isPending && (
            <button
              className="btn btn-active font-bold py-2 px-4 w-80 rounded mt-8"
              type="submit"
            >
              Login
            </button>
          )}
        </div>
        <div className="mt-6">
          {isPending && (
            <button disabled className="btn btn-secondary btn-block">
              Loading...
            </button>
          )}
        </div>
        <button
          type="button"
          className="btn btn-active font-bold py-2 px-4 w-80 rounded "
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>
        <div className="mt-4 flex items-center justify-between w-80">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <Link to="/register" className="text-xs text-gray-500 uppercase">
            or Register
          </Link>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
      </Form>
    </div>
  );
}

export default Register;
