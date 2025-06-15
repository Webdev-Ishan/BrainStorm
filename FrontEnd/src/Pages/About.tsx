const About = () => {
  return (
    <div className="py-20 mt-12 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="space-y-10 md:space-y-0 flex flex-col items-center justify-center text-center">
          <div className="w-full md:w-10/12 lg:w-8/12">
            <h2
              className="text-4xl md:text-5xl mb-16 font-extrabold text-blue-600 leading-tight"
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "black",
              }}
            >
              CAPTURE EVERYTHING
              <br />
              <span className="text-blue-200">ORGANISE WITH PURPOSE</span>
              <br />
              <span className="text-white">REMEMBER FOREVER</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed font-bold text-white">
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
              <span className="italic text-black">precison</span>.
            </p>
            <p className="mt-16 text-lg leading-relaxed font-bold text-white">
              With intuitive tagging systems,
              <span className="italic text-black">AI-assisted</span>{" "}
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
