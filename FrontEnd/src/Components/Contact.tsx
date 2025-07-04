import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/Components/ui/button";

export const Contact = () => {
  const [Fullname, setFullname] = useState("");
  const [email, setemail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  const naviagte = useNavigate();

  const url = import.meta.env.VITE_API_URL;

  type BackendResponse = {
    success: boolean;
    message: string;
    token:string;
  };

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("email", email);
    formdata.append("Fullname", Fullname);
    formdata.append("Subject", Subject);
    formdata.append("Message", Message);

    try {
      const response = await axios.post<BackendResponse>(
        `${url}/api/contact/request`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
         localStorage.setItem("token", response.data.token);
        naviagte("/");
        toast.success("Response Submitted");
        setFullname("");
        setemail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(response.data.message);
        setFullname("");
        setemail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
        setFullname("");
        setemail("");
        setSubject("");
        setMessage("");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br pt-4 from-purple-600 via-purple-500 to-blue-500">
      <h2
        className="text-3xl mt-16 text-center md:text-4xl font-extrabold text-white  mb-2 drop-shadow-lg tracking-wide"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#000",
        }}
      >
        CONTACT US
      </h2>
      <div className="flex items-center  justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px]">
          <form
            onSubmit={submithandler}
            className="border border-black  rounded-lg p-2 px-2"
          >
            <div className="mb-5 px-2 ">
              <label className="mb-3 block text-sm font-medium text-white">
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={Fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5 px-2">
              <label className="mb-3 block text-sm font-medium text-white">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5 px-2">
              <label className="mb-3 block text-sm font-medium text-white">
                SUBJECT
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter your subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5 px-2">
              <label className="mb-3 block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Type your message"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div className="flex min-h-auto ab flex-col items-center justify-center">
              <Button
                className="bg-blue-400 text-white border border-black"
                size={"default"}
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
