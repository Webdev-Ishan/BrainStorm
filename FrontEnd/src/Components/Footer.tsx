import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <footer className="relative w-full bg-slate-600 text-white">
        <div className="mx-auto w-full max-w-7xl px-8 bg-slate-600 text-white">
          <div className="mx-auto grid text-center h-auto w-full grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-3 bg-slate-600 text-white">
            <ul>
              <p className="font-sans antialiased text-xl  mb-6 font-semibold text-blue-600">
                Company
              </p>
              <li className="mb-4 hover:scale-105 duration-300">
                <Link
                  to={"/"}
                  className="font-sans antialiased  text-sm  text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  HomePage
                </Link>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <Link
                  to="https://www.linkedin.com/in/ishan-saini-49b6842a6/"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Careers
                </Link>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <a
                  href="#"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Press
                </a>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <Link
                  to="https://zeenews.india.com/"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  News
                </Link>
              </li>
            </ul>

            <ul>
              <p className="font-sans antialiased   mb-6 text-xl font-semibold text-blue-600">
                Help Center
              </p>
              <li className="mb-4 hover:scale-105 duration-300">
                <a
                  href="https://discord.com/"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Discord
                </a>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <a
                  href="https://x.com/saini_isha57790"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500  hover:font-semibold duration-300"
                >
                  Twitter
                </a>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <a
                  href="https://github.com/Webdev-Ishan?tab=overview&from=2025-06-01&to=2025-06-14"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  GitHub
                </a>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <Link
                  to="/Contact"
                  className="font-sans antialiased text-sm text-current py-1 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <ul>
              <p className="font-sans antialiased   mb-6 font-semibold text-xl text-blue-600">
                Resources
              </p>
              <li className="mb-4 hover:scale-105 duration-300">
                <Link
                  to="https://www.buildingasecondbrain.com/"
                  className="font-sans antialiased text-sm text-current py-1 mt-4 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <a
                  href="#"
                  className="font-sans antialiased text-sm text-current py-1 mt-4 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Newsletter
                </a>
              </li>
              <li className="mb-4 hover:scale-105 duration-300">
                <Link
                  to="https://www.ssp.sh/brain/"
                  className="font-sans antialiased text-sm text-current py-1 mt-4 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Free Products
                </Link>
              </li>
              <li className="hover:scale-105 duration-300">
                <a
                  href="#"
                  className="font-sans antialiased text-sm text-current py-1 mt-4 hover:text-purple-500 hover:font-semibold duration-300"
                >
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 border-t border-stone-200 py-4 md:flex-row md:justify-between">
            <small className="font-sans antialiased text-sm text-current text-center">
              © 2025{" "}
              <a
                href="https://www.buildingasecondbrain.com/"
                className="hover:underline font-bold text-blue-600"
              >
                BrainStorm
              </a>
              . All Rights Reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
