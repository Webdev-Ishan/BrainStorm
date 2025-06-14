import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center py-16">
        <h2
          className="text-4xl md:text-6xl font-bold text-white mt-4 drop-shadow-lg mb-6"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "black",
          }}
        >
          Organize your thoughts with{" "}
          <span className="text-blue-600">Clarity</span>
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
          BrainStorm is your second brain — a digital space to capture, link,
          and retrieve your best ideas with ease.
        </p>
        <Link
          to="/About"
          className="bg-blue-600 text-white font-semibold border border-black px-6 py-2 rounded-xl shadow-md"
        >
          Know Us
        </Link>
      </main>

      {/* Section 1: Features */}
      <section className="bg-white text-purple-800 py-16 px-6 text-center">
        <h3
          className="text-4xl font-bold mb-4"
          
        >
          WHY BRAINSTORM?
        </h3>
        <p className="max-w-3xl mx-auto text-blue-600 text-lg mb-8">
          Whether it's ideas, links, notes, or resources—everything is stored in
          one place. Access your thoughts anytime, anywhere with structured
          clarity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-purple-100 p-6 rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200  hover:shadow-purple-500">
            <h4 className="text-xl font-semibold mb-4 text-blue-700">SMART NOTES</h4>
            <p>Capture thoughts instantly and link them contextually.</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-purple-500">
            <h4 className="text-xl font-semibold mb-4 text-blue-700">VISUAL ORGANISATION</h4>
            <p>
              Use tags, topics, and collections to group your ideas naturally.
            </p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md border hover:border-blue-600 hover:scale-105 duration-200 hover:shadow-purple-500">
            <h4 className="text-xl font-semibold mb-4 text-blue-700">QUICK SEARCH</h4>
            <p>
              Retrieve your data instantly with intelligent keyword matching.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Use Cases */}
      <section className="bg-purple-600 text-white py-16 px-6 text-center">
        <h3 className="text-4xl font-bold mb-4">BUILT FOR EVERY MIND</h3>
        <p className="max-w-3xl mx-auto text-lg mb-24">
          From students to engineers to writers—BrainStorm adapts to your
          thinking style and workflow.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div className="border border-white rounded-xl bg-white text-black p-6 w-72 shadow-md  hover:border-blue-600 hover:scale-105 duration-200  hover:shadow-blue-600">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Students</h4>
            <p>Organize class notes and research effortlessly.</p>
          </div>
          <div className="border border-white rounded-xl bg-white text-black p-6 w-72 shadow-md  hover:border-blue-600 hover:scale-105 duration-200  hover:shadow-blue-600">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Developers</h4>
            <p>Store code snippets, project links, and tech stacks.</p>
          </div>
          <div className="border border-white rounded-xl bg-white text-black p-6 w-72 shadow-md  hover:border-blue-600 hover:scale-105 duration-200  hover:shadow-blue-600">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Writers</h4>
            <p>Capture story ideas, outlines, and character sketches.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="bg-gray-100 text-center text-purple-800 py-16 px-6">
        <h3 className="text-3xl font-bold mb-6">
          Start Building Your Second Brain Today
        </h3>
        <p className="max-w-xl mx-auto text-lg mb-16">
          Sign up for BrainStorm and never lose track of your thoughts again.
          It's free, fast, and built with love for creative minds.
        </p>
        <Link
          to="/SignIn"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-md border mb-24 border-black"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
