import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState("");
  const handleClick = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };
  return (
    <div className="w-full flex justify-center">
      <div
        className="relative w-[1300px] h-[300px] bg-center bg-cover flex px-12 py-12 "
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="z-10 w-full h-full text-white flex flex-col justify-between">
          {/* 타이틑 */}
          <div className="-space-y-0">
            <h1 className="font-bold">Welcome.</h1>
            <h2 className="font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </h2>
          </div>
          {/* 인풋박스 */}
          <div className="relative">
            <input
              onChange={handleChange}
              className="w-full py-3 px-4 text-gray-900 outline-none rounded-3xl"
              type="text"
              placeholder="search for movie, Tv, shows, person..."
            />
            <button
              onClick={handleClick}
              className=" py-3 px-6 rounded-3xl absolute right-0 font-semibold hover:text-black"
              style={{
                background:
                  "linear-gradient(to right, #4f46e5, #da21ff, #ff0000)",
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-800/70"></div>
      </div>
    </div>
  );
}
