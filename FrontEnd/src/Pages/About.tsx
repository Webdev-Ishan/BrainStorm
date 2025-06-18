import brain from "../assets/brain.jpg";
const About = () => {
  return (
    <div
      className="w-full h-full mt-16 flex justify-center  items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${brain})` }}
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="flex flex-col items-center text-center">
          <div className="w-full md:w-10/12 lg:w-8/12 space-y-10">
            {/* Heading */}
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-snug drop-shadow-md"
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "black",
              }}
            >
              <span className="text-blue-600 block mb-2">
                CAPTURE EVERYTHING
              </span>
              <span className="text-blue-200 block mb-2">
                ORGANISE WITH PURPOSE
              </span>
              <span className="text-white block">REMEMBER FOREVER</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="w-full text-lg md:text-xl border border-black font-semibold leading-relaxed text-white/90 bg-white/10 p-6 rounded-xl shadow-inner backdrop-blur-sm">
              In a world overflowing with information, our minds are constantly
              bombarded with ideas, inspirations, tasks, and fleeting
              thoughts—many of which disappear before we can make something
              meaningful from them. That’s where the{" "}
              <span className="font-bold italic text-black">
                Second Brain App
              </span>{" "}
              steps in. Designed to be more than just a notes app, it serves as
              your personal knowledge repository—a digital extension of your
              mind. Whether you're a student tracking concepts, a developer
              organizing code, or a creator outlining ideas, this app empowers
              you to store, retrieve, and act on information with{" "}
              <span className="italic text-black">precision</span>.
            </p>

            {/* Paragraph 2 */}
            <p className=" w-full mb-8 text-lg md:text-xl border border-black font-semibold leading-relaxed text-white/90 bg-white/10 p-6 rounded-xl shadow-inner backdrop-blur-sm">
              With intuitive tagging systems,
              <span className="italic text-black"> AI-assisted</span>{" "}
              organization, and seamless syncing across devices, the Second
              Brain App ensures that no idea gets lost, no task remains
              forgotten, and no goal stays undefined. Inspired by thinkers like{" "}
              <span className="italic text-black">Tiago Forte</span>, our
              platform is built to help you{" "}
              <span className="font-semibold text-white">
                think clearly, remember intelligently, and act intentionally
              </span>
              . This isn’t just an app—it’s your trusted cognitive companion in
              a noisy digital world. Let your mind breathe, and let your Second
              Brain do the remembering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
