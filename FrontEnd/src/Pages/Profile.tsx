import { useState, useEffect } from "react";
import { Button } from "../Components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Card } from "../Components/Card";

// ✅ Move outside the component for better reusability
type ContentItem = {
  link: string;
  type: string;
  title: string;
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

const Profile = () => {
  const [username, setusername] = useState("");
  const [Email, setEmail] = useState("");
  const [arr, setarr] = useState<ContentItem[]>([]);

  const url = import.meta.env.VITE_API_URL;

  const fetchdata = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `${url}/api/auth/profile`,
        {
          withCredentials: true,
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
        toast.error(error.message);
        setEmail("");
        setusername("");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []); // ✅ use empty dependency array to avoid infinite loop

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white flex flex-col relative">
      {/* Top Right Update Profile Button */}
      <div className="absolute top-20 right-4">
        <Link
          to={`/Update`}
          className="bg-blue-300 hover:bg-blue-500 hover:text-white duration-300 text-black font-semibold px-3 py-2 rounded-xl shadow-md border mb-24 border-black"
        >
          Update Profile
        </Link>
      </div>

      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-16">
        <h2
          className="text-4xl md:text-6xl font-bold text-white mt-4 drop-shadow-lg mb-24"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "black",
          }}
        >
          WELCOME <span className="text-blue-600 uppercase">{username}</span>
        </h2>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
          <span className="font-bold text-black">
            You are now in your second brain
          </span>{" "}
          — a digital space to capture, link, and retrieve your best ideas with
          ease.
        </p>

        <span className="mt-12 mb-16">
          Your Working email is - <b className="text-black">{Email}</b>
        </span>

        <Button
          onClick={() => {}}
          variant="Secondary"
          size="sm"
          text="Add Links"
          link="/SignIn"
        />
      </main>

      {/* ✅ Mapping all items of arr */}
      <section className="w-full bg-white min-h-[50vh]">
        <div className="w-full h-full mt-16 mb-16 flex justify-center items-center flex-wrap gap-8">
          {arr.length > 0 ? (
            arr.map((item, index) => (
              <Card key={index} link={item.link} title={item.title} />
            ))
          ) : (
            <p className="text-black">No content added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
