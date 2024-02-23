import { useEffect, useState } from "react";
import { ThemeContext } from "./Context/ThemeContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.tsx";
import Home from "./Pages/Home/HomePage.tsx";
import Login from "./Pages/Login/LoginPage.tsx";
import Register from "./Pages/Register/RegisterPage.tsx";
import CreateChannel from "./Pages/CreateChannel/CreateChannel.tsx";
import UploadVideo from "./Pages/UploadVideo/UploadVideo.tsx";
import VideoPlayer from "./Pages/VideoPlayer/VideoPage.tsx";
import ChannelView from "./Pages/Channel/ChannelView.tsx";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme: string | null = localStorage.getItem("theme");
    setTheme(storedTheme || "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${theme} ${
          theme === "dark" ? "bg-[#202020]" : ""
        } min-h-[100vh]`}
      >
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createChannel" element={<CreateChannel />} />
            <Route path="/uploadVideo" element={<UploadVideo />} />
            <Route path="/playVideo/:id" element={<VideoPlayer />} />
            <Route path="/channel/:channelId" element={<ChannelView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
