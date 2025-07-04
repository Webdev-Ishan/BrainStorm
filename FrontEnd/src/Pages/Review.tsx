import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/Redux/store";

type BackendResponse = {
  success: boolean;
  message: string;
  token: string;
};

export const Review = () => {
  const navigate = useNavigate();

  const loginStatus = useSelector(
    (state: RootState) => state.LoginReducer.login
  );

  const [Fullname, setFullname] = useState("");
  const [review, setreview] = useState("");
  const url = import.meta.env.VITE_API_URL;

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", Fullname);
    formdata.append("content", review);

    try {
      const response = await axios.post<BackendResponse>(
        `${url}/api/review/`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Review successfull");
        navigate("/Profile");
        setreview("");
        setFullname("");
      } else {
        toast.error(" Oops Try Again");
        setreview("");
        setFullname("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
        setreview("");
        setFullname("");
      }
    }
  };

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/SignIn");
    }
  }, []);

  return (
    <div className="bg-gradient-to-br mt-16 from-purple-500 to-blue-500 py-12 px-4 md:px-0">
      <h2
        className="text-3xl md:text-4xl text-center font-extrabold text-white mb-10 tracking-wide drop-shadow-lg"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#000",
        }}
      >
        TELL US YOUR OPINION
      </h2>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-[550px] bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-300">
          <form onSubmit={submithandler} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={Fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>

            {/* Review */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                REVIEW
              </label>
              <textarea
                name="subject"
                id="subject"
                value={review}
                onChange={(e) => setreview(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                className="bg-blue-600  transition duration-200 text-white font-semibold border border-black px-6 py-2 rounded-md"
                size="default"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
