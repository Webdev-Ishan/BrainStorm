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

const Brain = () => {
  const [type, settypes] = useState("");
  const [link, setlink] = useState("");

  const neuron = useParams().id;
  const url = import.meta.env.VITE_API_URL;

  const fetchBrain = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `${url}/api/user/Braincontent/${neuron}`,
        {
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
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    fetchBrain();
  }, [neuron]);
  return (
  <div className="w-full min-h-screen bg-black pt-24 pb-8 flex justify-center items-center">
    {type ? (
      <div className="flex flex-col justify-between items-center space-y-3">
        <Card type={type} link={link} />
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

export default Brain;
