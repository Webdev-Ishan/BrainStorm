import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { Card } from "../Components/Card";
import { Button } from "@/Components/ui/button";

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
 const navigate = useNavigate();
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
       <div className="flex min-h-auto ab flex-col items-center justify-center">
              <Button
                onClick={() => {
                  navigate("/Update");
                }}
                className="bg-blue-400 text-white border border-black"
              >
                Update Profile
              </Button>
            </div>
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

       <div className="flex min-h-auto ab flex-col items-center justify-center">
              <Button
                onClick={() => {
                  navigate("/Content");
                }}
                className="bg-blue-400 text-white border border-black"
              >
                Add Link
              </Button>
            </div>
      </main>

      {/* ✅ Mapping all items of arr */}
      <section className="w-full bg-blue-100 min-h-[50vh]">
        <div className="w-full h-full mt-16 mb-16 flex justify-center items-center flex-wrap gap-8">
          {arr.length > 0 ? (
            arr.map((item, index) => (
              <Card key={index} link={item.link} title={item.title} type={item.type}/>
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
