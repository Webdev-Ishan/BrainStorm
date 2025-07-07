import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Card } from "../Components/Card";
import { Skeleton } from "@/Components/ui/skeleton";

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

const Edit = () => {
  const [type, settypes] = useState("");
  const [link, setlink] = useState("");

  const id = useParams().id;
  const url = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
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
        settypes(response.data.content.type);
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete<BackendResponse>(
        `${url}/api/user/content/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token as header
          },
          withCredentials: true,
        }
      );
      if (response.data && response.data.success) {
        settypes(response.data.content.type);
        setlink(response.data.content.link);
      } else {
        toast.error(response.data.message || "Something went wrong");
        console.log(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Something went wrong.");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchBrain();
  }, [id]);
  return (
    <div className="w-full h-full bg-black pt-24 pb-8  ">
      {type ? (
        <div className="w-auto h-auto flex justify-center flex-col items-center">
          <Card type={type} link={link} />
          <button
            type="button"
            onClick={handleDelete}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
