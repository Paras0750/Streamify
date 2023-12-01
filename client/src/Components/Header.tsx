import { useContext, useEffect } from "react";
import logo from "../assets/logo2.jpeg";
import { Moon, Search, Sun } from "lucide-react";
import { ThemeContext } from "../Context/ThemeContext";

const Header = () => {
  const context = useContext(ThemeContext);
  const { theme, setTheme } = context || { theme: "light", setTheme: () => {} };

  useEffect(() => {
    console.log("theme: ", theme);
  }, [theme]);

  return (
    <div className={`flex items-center p-3 `}>
      <img
        src={logo}
        alt="logo"
        height={60}
        width={60}
        className="rounded-full"
        onClick={() => {
          window.location.href = "/";
        }}
      />
      <div className="flex bg-slate-200 p-2 w-full items-center mx-5 rounded-full">
        <Search />
        <input
          type="text"
          className="px-2 bg-transparent outline-none"
          placeholder="Search"
        />
      </div>
      <div>
        {theme === "dark" ? (
          <Moon
            className="bg-slate-200 text-black p-1 rounded-full h-[38px] w-[38px] cursor-pointer"
            onClick={() => {
              setTheme("light"), localStorage.setItem("theme", "light");
            }}
          />
        ) : (
          <Sun
            className="bg-slate-200 text-black p-1 rounded-full h-[38px] w-[38px] cursor-pointer"
            onClick={() => {
              setTheme("dark"), localStorage.setItem("theme", "dark");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
