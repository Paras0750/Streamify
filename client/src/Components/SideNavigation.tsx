import { useEffect, useState } from "react";
import Subs from "./Subs";
import { History, Home, ThumbsUp, TrendingUpIcon, User2 } from "lucide-react";

type PageTemp = {
  key: number;
  name: string;
  path: string;
  icon: React.ReactNode;
}[];
interface Sub {
  key: number;
  img: string;
  name: string;
  path: string;
}

const NavigationSlide = () => {
  const [subs, setSubs] = useState<Sub[]>([]);
  useEffect(() => {
    setSubs([
      {
        key: 1,
        img: "https://simpleicon.com/wp-content/uploads/user-1.png",
        name: "User 1",
        path: "/user1",
      },
      {
        key: 2,
        img: "https://simpleicon.com/wp-content/uploads/user-1.png",
        name: "User 2",
        path: "/user2",
      },
      {
        key: 3,
        img: "https://simpleicon.com/wp-content/uploads/user-1.png",
        name: "User 3",
        path: "/user3",
      },
      {
        key: 4,
        img: "https://simpleicon.com/wp-content/uploads/user-1.png",
        name: "User 4",
        path: "/user4",
      },
    ]);
  }, []);

  const pages: PageTemp = [
    {
      key: 1,
      name: "Home",
      path: "/",
      icon: <Home />,
    },
    {
      key: 2,
      name: "Your Videos",
      path: "/me",
      icon: <User2 />,
    },
    {
      key: 3,
      name: "History",
      path: "/history",
      icon: <History />,
    },
    {
      key: 4,
      name: "Trending",
      path: "/trending",
      icon: <TrendingUpIcon />,
    },
    {
      key: 5,
      name: "Liked Videos",
      path: "/liked",
      icon: <ThumbsUp />,
    },
  ];

  return (
    <div>
      <div className="py-5">
        <div className="text-[2rem] font-bold text-center dark:text-white">
          Streamify
        </div>

        <div className="grid grid-cols-1 gap-5 mt-5 text-center text-[1.2rem] dark:text-white">
          {pages.map((page) => (
            <div
              key={page.key}
              className="flex items-center justify-center rounded-md hover:bg-gray-300 py-2"
            >
              {page.icon}
              <a className="px-2" href={page.path}>
                {page.name}
              </a>
            </div>
          ))}
        </div>
      </div>
      <hr className="px-2" />
      <div className="text-[1.4rem] font-bold text-center px-5 dark:text-white py-5">
        Subscriptions
      </div>
      <div>
        {subs.map((sub) => (
          <Subs key={sub.key} img={sub.img} name={sub.name} path={sub.path} />
        ))}
      </div>
    </div>
  );
};

export default NavigationSlide;
