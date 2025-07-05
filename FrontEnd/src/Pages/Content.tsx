import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const Content = () => {
  const [Title, setTitle] = useState("");
  const [link, setlink] = useState("");
  const [type, settype] = useState("");
  const [tags, settags] = useState<string[]>(["", "", ""]);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  type BackendResponse = {
    success: boolean;
    message: string;
    token:string;
  };

  const validateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const validateLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlink(e.target.value);
  };

  const validateTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    settype(e.target.value);
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    settags(updatedTags);
  };

  const token = localStorage.getItem("token");

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await axios.post<BackendResponse>(
        `${url}/api/user/content`,
        {
          title: Title,
          link: link,
          type: type,
          tags: tags, // ✅ tags is a string[]
        },
        {
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Content Added");
        navigate("/Profile");
        setTitle("");
        setlink("");
        settype("");
        settags(["", "", ""]);
      } else {
        toast.error("Oops! Try again");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="text-center mt-24 mb-16">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight font-bold">Enter the Content</h2>
      </div>

      <div className="flex justify-center my-2 mx-4 md:mx-0 mb-24">
        <form
          onSubmit={submithandler}
          className="w-full max-w-xl bg-blue-200 border rounded-lg shadow-md p-6 duration-300 hover:shadow-md hover:shadow-purple-500"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Title
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={Title}
                onChange={validateTitle}
                required
              />
            </div>

            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Link of Source
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={link}
                onChange={validateLink}
                required
              />
            </div>

            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Type
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={type}
                onChange={validateTypes}
                required
              />
            </div>

            {/* TAG INPUTS */}
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Tags (Enter 3)
              </label>
              {tags.map((tag, index) => (
                <input
                  key={index}
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  placeholder={`Tag ${index + 1}`}
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-2 px-3 leading-tight focus:outline-none mb-2"
                  required
                />
              ))}
            </div>

            <div className="w-full px-3 mb-6">
              <button className="appearance-none block w-full from-purple-600 via-purple-500 bg-gradient-to-br to-blue-500 text-white hover:border-blue-600 duration-300 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
