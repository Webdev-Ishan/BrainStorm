import { Navbar } from "./Components/Navbar";
import About from "./Pages/About";
import Homepage from "./Pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-200 w-full h-full ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
