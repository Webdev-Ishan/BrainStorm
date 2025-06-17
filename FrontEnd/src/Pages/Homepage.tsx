import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

type ContentItem = {
  name: string;
  content: string;
};

type BackendResponse = {
  success: boolean;
  message: string;
  reviews: ContentItem;
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [reviews, setreviews] = useState<ContentItem | null>();
  const url = import.meta.env.VITE_API_URL;

  const fetchReviews = async () => {
    try {
      const response = await axios.get<BackendResponse>(
        `${url}/api/review/`,

        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        setreviews(response.data.reviews);
      } else {
        toast.error("Oops! Try Again");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mt-8 drop-shadow-lg mb-6"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "black",
          }}
        >
          Organize your thoughts with <br />
          <span className="text-blue-600">Clarity</span>
        </h2>
        <p className="text-md md:text-lg text-white/90 max-w-2xl mb-8">
          BrainStorm is your second brain — a digital space to capture, link,
          and retrieve your best ideas with ease.
        </p>
        <div className="flex min-h-auto flex-col items-center justify-center">
          <Button
            onClick={() => {
              navigate("/About");
            }}
            className="bg-purple-500 text-white border border-black"
            size={"sm"}
          >
            KNOW US
          </Button>
        </div>
      </main>

      {/* Section 1: Features */}
      <section className="bg-white text-purple-800 py-12 px-6 text-center">
        <h3 className="text-3xl font-bold  mb-8">WHY BRAINSTORM?</h3>
        <p className="max-w-3xl mx-auto text-blue-600 text-md mb-8">
          Whether it's ideas, links, notes, or resources—everything is stored in
          one place. Access your thoughts anytime, anywhere with structured
          clarity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-purple-100  border-black p-6 rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200  hover:shadow-purple-500">
            <h4 className="text-lg font-bold mb-4 text-blue-700">
              SMART NOTES
            </h4>
            <p className="text-sm">
              Capture thoughts instantly and link them contextually.
            </p>
          </div>
          <div className="bg-purple-100 border-black p-6 rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-purple-500">
            <h4 className="text-lg font-bold mb-4 text-blue-700">
              VISUAL ORGANISATION
            </h4>
            <p className="text-sm">
              Use tags, topics, and collections to group your ideas naturally.
            </p>
          </div>
          <div className="bg-purple-100 p-6 border-black rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-purple-500">
            <h4 className="text-lg font-bold mb-4 text-blue-700">
              QUICK SEARCH
            </h4>
            <p className="text-sm">
              Retrieve your data instantly with intelligent keyword matching.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Use Cases */}
      <section className="bg-purple-600 text-white py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">BUILT FOR EVERY MIND</h3>
        <p className="max-w-3xl mx-auto text-md text-black mb-24">
          From students to engineers to writers—BrainStorm adapts to your
          thinking style and workflow.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div className="bg-white p-6 border-black rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-blue-500">
            <h4 className="text-lg font-bold mb-4 text-blue-700">STUDENTS</h4>
            <p className="text-sm text-black">
              Research and study effectivly using the BrainStorm.
            </p>
          </div>
          <div className="bg-white p-6 border-black rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-blue-500">
            <h4 className="text-lg font-bold mb-4 text-blue-700">DEVELOPERS</h4>
            <p className="text-sm text-black">
              Store Projects,Links and Code snippets in BrainStorm.
            </p>
          </div>
          <div className="bg-white p-6 border-black rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-blue-500">
            <h4 className="text-lg font-bold mb-4 text-blue-700">WRITERS</h4>
            <p className="text-sm text-black">
              Capture ideas and scripts using the BrainStorm.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="bg-pink-100 text-center text-purple-800 py-16 px-4">
        <h3 className="text-2xl font-bold mb-8">
          START BUILDING YOUR SERCOND BRAIN TODAY
        </h3>
        <p className="max-w-xl text-blue-600 mx-auto text-md mb-16">
          Sign up for BrainStorm and never lose track of your thoughts again.
          It's free, fast, and built with love for creative minds.
        </p>
        <div className="flex min-h-auto flex-col items-center justify-center">
          <Button
            onClick={() => {
              navigate("/SignIn");
            }}
            className="bg-purple-500 text-white border border-black"
          >
            Get Started
          </Button>
        </div>
      </section>

      <section className="text-center text-black p-8">
        <h3 className="text-3xl font-bold mb-8 text-white mt-8">
          WHAT OUR USER SAYS ABOUT US ?
        </h3>

        <div className="relative w-full flex justify-center px-4 md:px-24">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent>
              {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full flex justify-center"
                  >
                    <div className="w-96 h-58 border border-black rounded-xl bg-pink-100 text-black p-6 shadow-md hover:border-blue-600 duration-200 hover:shadow-blue-600">
                      <h4 className="text-xl font-semibold mb-4 text-blue-600">
                        {review.name}
                      </h4>
                      <p>{review.content}</p>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="basis-full flex justify-center">
                  <div className="w-96 h-58 border border-black rounded-xl bg-pink-100 text-black p-6 shadow-md hover:border-blue-600 duration-200 hover:shadow-blue-600">
                    Loading .....
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Responsive button container */}
        <div className="mt-8 flex justify-center md:justify-end px-4 md:px-24">
          <Button
            onClick={() => {
              navigate("/Review");
            }}
            className="bg-white text-blue-500 border border-black "
            size="default"
          >
            REVIEW US
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
