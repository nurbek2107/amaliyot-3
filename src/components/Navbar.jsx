import { useEffect, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { logout } from "../app/userSlice"; // Import your logout action

function themeFromLocalStorage() {
  return localStorage.getItem("theme") || "retro";
}

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(themeFromLocalStorage);

  const handleOut = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon !");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTheme = () => {
    const newTheme = theme === "retro" ? "dark" : "retro";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <ul className="p-2">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button onClick={handleTheme} className="btn btn-ghost btn-circle">
          {theme === "retro" ? <IoIosSunny /> : <IoIosMoon />}
        </button>
        <h1>{}</h1>
        {user ? (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-5">
              <h1>{user.displayName}</h1>

              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li>
                <button onClick={handleOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-ghost">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
