import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logo2.jpeg";
import { Moon, Search, Sun } from "lucide-react";
import { ThemeContext } from "../Context/ThemeContext";
import {
  ChannelDetails,
  logoutChannel,
  // selectChannel,
} from "../Redux/slices/channelSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const context = useContext(ThemeContext);
  const { theme, setTheme } = context || { theme: "light", setTheme: () => {} };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useSelector(
    (state: { channel: { channel: ChannelDetails } }) => state.channel.channel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("theme: ", theme);
    const handleClickOutside = (event: MouseEvent | Event): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [theme]);

  function handleLogout(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void {
    event.preventDefault();
    dispatch(logoutChannel());
    window.location.href = "/login";
  }

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
      <div className="px-2">
        {user ? (
          <div
            className="relative cursor-pointer"
            ref={dropdownRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-4 dark:text-white">
              <div className="px-2">{user.username}</div>
              <img
                className="rounded-full "
                src={`${
                  import.meta.env.VITE_API_MAIN_SERVER
                }/getFile/ChannelImages/${user.displayPic}`}
                width={40}
                height={40}
              />
            </div>

            {isDropdownOpen && (
              <div
                className="absolute bg-white rounded-lg shadow-md top-full mt-2 border"
                style={{ right: "0px", zIndex: "5" }}
              >
                <div className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pi">
                  Profile
                </div>
                <div className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pi">
                  History
                </div>
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg font-semibold">
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
