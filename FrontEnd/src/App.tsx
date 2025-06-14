import { Navbar } from "./Components/Navbar";
import About from "./Pages/About";
import Homepage from "./Pages/Homepage";
import Footer from "./Components/Footer";
import { Contact } from "./Components/Contact";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";
import { Update } from "./Pages/Update";
import { Content } from "./Pages/Content";
const App = () => {
  return (
  <>
    <ToastContainer/>
    <BrowserRouter>
      <div className=" w-full h-full ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Update" element={<Update />} />
          <Route path="/Content" element={<Content/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
    </>
  );
};

export default App;
