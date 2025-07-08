import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type ContentItem = {
  link: string;
  type: string;
  title: string;
};

type BackendResponse = {
  success: boolean;
  message: string;
  content: ContentItem;
};

function EditContent() {
  const [type, settype] = useState("");
  const [link, setlink] = useState("");
  const [Title, setTitle] = useState("");

  const navigate = useNavigate();

  const id = useParams();
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const validateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const validateLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlink(e.target.value);
  };

  const validateTypes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    settype(e.target.value);
  };

  const fetchBrain = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `${url}/api/user/content/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token as header
          },
          withCredentials: true,
        }
      );
      if (response.data && response.data.success) {
        settype(response.data.content.type);
        setlink(response.data.content.link);
      } else {
        toast.error(response.data.message || "Something went wrong");
        console.log(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put<BackendResponse>(
        `${url}/user/updateInfo/${id}`,
        {
          Title,
          type,
          link,
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
        toast.success("Updation is successfull.");
        navigate("/Profile");
      } else {
        toast.error(response.data.message || "Something went wrong");
        console.log(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchBrain();
  }, [id]);

  return (
    <div className="mt-24 mb-16">
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
              <select
                value={type}
                onChange={validateTypes}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              >
                <option value="tweet">Tweet</option>
                <option value="Youtube">Youtube</option>
                <option value="linkedin">Linkedin</option>
                <option value="Instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div className="w-full px-3 mb-6">
              <button className="appearance-none block w-full from-purple-600 via-purple-500 bg-gradient-to-br to-blue-500 text-white hover:border-blue-600 duration-300 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none">
                Create New
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContent;
