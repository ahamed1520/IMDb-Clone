import React from "react";
import Logo from "../Assets/MovieLogo-removebg-preview.png";
import { Link } from "react-router-dom";

const Navibar = () => {
  return (
    <div className="flex space-x-8 items-center pl-3 py-2   ">
      <img src={Logo} alt="" className="w-[80px]" />
      <Link to="/">
        <h3 className="text-blue-400 hover:bg-sky-500 px-4 py-3 rounded-md hover:text-white font-medium">
          Movies
        </h3>
      </Link>
      <Link to="/WatchList">
        <h3 className="text-blue-400 hover:bg-sky-500 px-4 py-3 rounded-md hover:text-white font-medium">
          WatchList
        </h3>
      </Link>
    </div>
  );
};

export default Navibar;
