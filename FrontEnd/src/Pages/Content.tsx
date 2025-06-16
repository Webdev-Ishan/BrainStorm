import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const Content = () => {
  const [Title, setTitle] = useState("");
  const [link, setlink] = useState("");
  const [type, settype] = useState("");
  const [tags, settags] = useState([]);

  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_URL;

  type BackendResponse = {
    success: boolean;
    message: string;
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

  const validateTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    settags(e.target.value);
  };

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", Title);
    formdata.append("link", link);
    formdata.append("type", type);
    formdata.append("tags", tags);

    try {
      const response = await axios.post<BackendResponse>(
        `${url}/api/auth/signup`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        toast.success("Validation successfull");
        navigate("/Profile");
        settype("");
        setlink("");
        settype("");
      } else {
        toast.error(" Oops Try Again");
        settype("");
        setlink("");
        settype("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
        settype("");
        setlink("");
        settype("");
      }
    }
  };

  return (
    <div>
      <div className="text-center mt-24 mb-16  ">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight font-bold">Enter the Content</h2>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0 mb-24 ">
        <form
          onSubmit={submithandler}
          className="w-full max-w-xl bg-blue-200 border  rounded-lg shadow-md p-6 duration-300 hover:shadow-md hover:shadow-purple-500"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
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

            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Link OF SOURCE
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={link}
                onChange={validateLink}
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                TYPE
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={type}
                onChange={validateTypes}
                required
              />
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <select value={tags}>
                <option value="Orange">Orange</option>
                <option value="Radish">Radish</option>
                <option value="Cherry">Cherry</option>
              </select>
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3 "></div>
            <div className="w-full md:w-full px-3 mb-6">
              <button className="appearance-none block w-full from-purple-600 via-purple-500 bg-gradient-to-br 0 to-blue-500 text-white  hover:border-blue-600 duration-300 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
