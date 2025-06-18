import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { RootState } from "@/Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../Redux/LoginSlice";
import axios from "axios";

type BackendResponse = {
  success: boolean;
  message: string;
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [buttonprop, setbuttonProp] = useState("Get Started");

  const loginStatus = useSelector(
    (state: RootState) => state.LoginReducer.login
  );

  const dispatch = useDispatch();
  const url = import.meta.env.VITE_API_URL;
  const buttonHandler = async () => {
    if (loginStatus === true) {
      try {
        const response = await axios.post<BackendResponse>(
          `${url}/api/auth/logout`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.data && response.data.success) {
          dispatch(Logout());
          setbuttonProp("Get Started");
          toast.success("Logout Successfull");
        } else {
          toast.error("Unable to logout");
          console.log(response.data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    } else {
      navigate("/SignIn");
    }
  };

  const [neuron, setneuron] = useState("");

  const fetchBrain = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/content/${neuron}`);
    setneuron("");
  };

  useEffect(() => {
    if (loginStatus === true) {
      setbuttonProp("Logout");
    } else {
      setbuttonProp("Get Started");
    }
  }, [loginStatus]); // ✅ Correct

  return (
    <div>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-purple-500 duration-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo and Title */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 text-purple-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-blue-600">
              BrainStorm
            </span>
          </Link>

          {/* Hamburger Button - Visible only on mobile */}
          <button
            onClick={() =>
              document.getElementById("mobile-menu")?.classList.toggle("hidden")
            }
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Right Button (Login/Logout) */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 mr-4 rtl:space-x-reverse">
            <div className="flex min-h-auto flex-col items-center justify-center">
              <Button
                onClick={buttonHandler}
                className={
                  loginStatus
                    ? "bg-red-500 text-white border border-black"
                    : "bg-purple-500 text-white border border-black"
                }
                size={"sm"}
              >
                {buttonprop}
              </Button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            className="items-center justify-between gap-3 hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="nav-link text-purple-500 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="nav-link text-purple-500 hover:text-blue-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/Profile"
                  className="nav-link text-purple-500 hover:text-blue-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/Contact"
                  className="nav-link text-purple-500 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <form onSubmit={fetchBrain}>
              <input
                type="text"
                value={neuron}
                onChange={(e) => setneuron(e.target.value)}
                className="w-full max-w-2xl ml-5 px-5 rounded-xl border border-purple-500 bg-white text-gray-800 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
                placeholder="🔍 Enter Neuron..."
              />
            </form>
          </div>

          {/* Mobile Menu */}
          <div className="hidden w-full mt-4 md:hidden" id="mobile-menu">
            <ul className="flex flex-col font-medium rounded-lg bg-gray-50 p-4">
              <li>
                <Link
                  to="/"
                  className="mobile-nav-link text-purple-500 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="mobile-nav-link text-purple-500 hover:text-blue-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/Profile"
                  className="mobile-nav-link text-purple-500 hover:text-blue-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/Contact"
                  className="mobile-nav-link text-purple-500 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
