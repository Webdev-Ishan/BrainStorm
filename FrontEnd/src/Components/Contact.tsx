import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
    <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
      <div className="flex items-center mt-12 justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={submithandler}>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={Fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                SUBJECT
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter your subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Type your message"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-500 duration-300 border border-black py-3 px-8 text-base font-semibold text-white outline-none">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
