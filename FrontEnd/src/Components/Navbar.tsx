import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div>
      <nav className="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-purple-500 duration-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8 text-purple-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>

            <span className="self-center text-2xl font-bold whitespace-nowrap text-blue-600" >
              BrainStorm
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Button
              onClick={() => {
                 navigate("/SignIn")
              }}
              variant="Primary"
              size="sm"
              text="Get Started"
              link="/SignIn"
            />
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between gap-3 hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 text-lg px-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent rounded-sm md:bg-transparent hover:text-blue-700 md:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="block py-2 text-lg px-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent rounded-sm md:bg-transparent hover:text-blue-700 md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/Profile"
                  className="block py-2 text-lg px-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent  rounded-sm md:bg-transparent hover:text-blue-700 md:p-0"
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  href="/Contact"
                  className="block py-2 text-lg px-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent  rounded-sm md:bg-transparent hover:text-blue-700 md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>

            <input
              type="text"
              className="w-full max-w-xl ml-10 px-5 py-1 rounded-xl border border-purple-500 bg-white text-gray-800 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              placeholder="🔍 Enter Neuron..."
            />
          </div>
        </div>
      </nav>
    </div>
  );
};
