import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate= useNavigate()

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


const handleDelete = async()=>{


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
    if(error instanceof Error){
      toast.error("Somethign went wrong.")
      console.log(error.message)
    }
  }
}

  useEffect(() => {
    fetchBrain();
  }, [id]);
  return (
    <div className="w-full h-full bg-black pt-24 pb-8  ">
        <button
          onClick={() => navigate("/About")}
          className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-6"
        >
          <span className="absolute inset-[-1000%]  animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex hover:text-black border border-black duration-300 h-full w-full cursor-pointer items-center justify-center rounded-xl bg-blue-500 px-4 py-[2px] text-sm font-bold text-white backdrop-blur-3xl">
            Know Us
          </span>
        </button>
      {type ? (
        <div className="w-auto h-auto flex justify-center items-center">
        <Card type={type} link={link}  />
        <button type="button" onClick={()=>handleDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
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
