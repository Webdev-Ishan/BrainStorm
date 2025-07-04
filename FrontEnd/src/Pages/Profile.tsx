import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Card } from "../Components/Card";
import { Button } from "@/Components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { Link } from "react-router-dom";

// ✅ Move outside the component for better reusability
type ContentItem = {
  link: string;
  type: string;
  title: string;
  userID:string;
};

type BackendResponse = {
  success: boolean;
  message: string;
  user: {
    username: string;
    email: string;
    password: string;
    _id: string;
    contents: ContentItem[]; // ✅ fixed this to be an array
  };
};

type BackendResponse2 = {
  success: boolean;
  message: string;
  searchresult: ContentItem[];
};

const Profile = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const loginStatus = useSelector(
    (state: RootState) => state.LoginReducer.login
  );

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/SignIn");
    }
    setCheckingAuth(false);
  }, [loginStatus]);

  const [username, setusername] = useState("");
  const [Email, setEmail] = useState("");
  const [arr, setarr] = useState<ContentItem[]>([]);
  const [query, setquery] = useState("");

  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchdata = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `${url}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token as header
          },
        }
      );

      if (response.data && response.data.success) {
        setEmail(response.data.user.email);
        setusername(response.data.user.username);
        setarr(response.data.user.contents); // ✅ now an array
      } else {
        toast.error("Oops! Try Again");
        setEmail("");
        setusername("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setEmail("");
        setusername("");
      }
    }
  };

  

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<BackendResponse2>(
        `${url}/api/user/search`,
        {query},
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token as header
          },
        }
      );

      if (response.data && response.data.success) {
        setarr(response.data.searchresult);
        setquery("");
        console.log("success");
      } else {
        toast.error("Oops! Try Searching Again");
        setquery("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
        setquery("");
      }
    }
  };

  useEffect(() => {
    if (loginStatus === true) {
      fetchdata();
    }
  }, []); // ✅ use empty dependency array to avoid infinite loop

  return checkingAuth ? (
    <div className="text-white text-center py-10">Loading...</div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white flex flex-col relative">
      {/* Top Right Update Profile Button */}
      <div className="absolute top-20  right-4">
        <div className="flex min-h-auto ab flex-col items-center justify-center">
          <Button
            onClick={() => {
              navigate("/Update");
            }}
            className="bg-blue-400 text-white border border-black"
            size={"sm"}
          >
            Update Profile
          </Button>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-20 bg-gradient-to-b from-purple-600 to-blue-500">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-10 drop-shadow-lg tracking-wide flex "
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#000",
          }}
        >
          Welcome,&nbsp;
          <span className="text-blue-500 uppercase font-bold">{username}</span>
        </h2>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mb-6 leading-relaxed">
          <span className="font-semibold text-black underline underline-offset-4">
            You are now in your second brain —
          </span>{" "}
          a creative digital space where your thoughts, links, and knowledge
          come together seamlessly.
        </p>

        <div className="bg-white text-purple-800 px-6 py-4 rounded-xl shadow-md mt-4 mb-10">
          <p className="text-sm md:text-base font-medium">
            Your working email:&nbsp;
            <span className="text-blue-600 font-bold">{Email}</span>
          </p>
        </div>

        <div className="flex min-h-auto ab flex-col items-center justify-center">
          <Button
            onClick={() => {
              navigate("/Content");
            }}
            className="bg-blue-400 text-white border border-black"
            size={"default"}
          >
            Add Link +
          </Button>
        </div>
      </main>

      {/* ✅ Mapping all items of arr */}
      <section className="w-full bg-black min-h-[50vh]">
        <h2
          className="text-4xl mr-2 ml-2 mt-16 text-center md:text-4xl font-extrabold text-blue-500  mb-2  tracking-wide"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "white",
          }}
        >
          YOUR SAVED LINKS ARE HERE
        </h2>

        <div className=" p-8 text-center w-full flex justify-center items-center  gap-4">
          <form onSubmit={onSearch} className="w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setquery(e.target.value)}
              className="w-full max-w-2xl ml-5 px-5  rounded-lg border border-blue-500 bg-white text-gray-800 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              placeholder="🔍Search by Keywords"
            />
          </form>
          <Button
            onClick={() => {
              fetchdata();
            }}
            className="bg-blue-400 text-white border ml-2 mr-2 border-black"
            size={"default"}
          >
            Back
          </Button>
        </div>
        <div className="w-full min-h-[60vh] py-16 px-4 flex justify-center items-center flex-wrap gap-6 md:gap-10 bg-black rounded-xl ">
          {arr.length > 0 ? (
            arr.map((item, index) => (
              <div className="card bg-white rounded-2xl w-64 pr-2 h-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                <figure className="px-5 pt-5">
                  <div className="w-full h-60 rounded-lg border border-gray-200 p-3 bg-gray-50">
                    <Card
                      key={index}
                      link={item.link}
                      title={item.title}
                      type={item.type}
                    />
                  </div>
                </figure>
                <div className="card-body px-5 py-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <div className="flex justify-end ">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300 shadow-md hover:shadow-lg">
                        Visit Link
                      </button>
                    </a>

                     <Link
                      to={`/content/${item.userID}`}
                      className="inline-block"
                    >
                      <button className="px-4 py-2 ml-2 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300 shadow-md hover:shadow-lg">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No content added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
