import React from "react";

interface SubsProps {
  img: string;
  name: string;
  path: string;
}

const Subs: React.FC<SubsProps> = (props) => {
  const { img, name, path } = props;

  return (
    <a
      className="rounded-md hover:bg-gray-100 flex items-center justify-center py-2 dark:text-white "
      href={path}
    >
      <img
        className={`md:h-[1.4rem] ${
          localStorage.getItem("theme") === "dark" ? "invert" : null
        }`}
        src={img}
        alt=""
      />
      <span className="px-5 text-[1.2rem]">{name}</span>
    </a>
  );
};

export default Subs;
