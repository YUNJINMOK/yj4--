import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GridLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

export default function TrendingPage() {
  const [lists, setLists] = useState([]);
  const [data, setData] = useState();
  const [isLoding, setIsLoding] = useState();
  let tabs = [
    { id: "all", label: "All" },
    { id: "movie  ", label: "Movies" },
    { id: "person", label: "People" },
    { id: "tv", label: "TV" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/${activeTab}/day?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGFhYmZkZTlmNGY0MGNjYzVjYmM0ZjFjODE4MTUyYiIsInN1YiI6IjY1OWNhMDFjYjZjZmYxMDI1Yjk0YjJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfPbGJ-c_OzNonXxiGhS3SIVm8XFK8o5NowWRYXwoIs",
      },
    };

    setIsLoding(true);

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setLists(json?.results.slice(0, 7));
        setData(json.results);
      })
      .catch((err) => console.error("error:" + err))
      .finally(() => {
        setIsLoding(false);
      });
  }, [activeTab]);
  return (
    <div className="w-[full] flex justify-center">
      <div className="w-[1300px] h-[400px] pt-8">
        {/* 타이틀 */}
        <div className="flex">
          <h2 className="px-4 py-2 font-semibold text-[24px]">Trending</h2>
          {/* tab bar */}
          <div className="border-2 border-gray-900 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? "text-white" : "text-black"
                } relative rounded-full px-6 py-3 text-l font-semibold transition`}
              >
                {/* 앞의 조건 만족시에만 뒤에 결과를 보여줌 */}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className=" absolute inset-0 bg-gray-900 rounded-full -z-10"
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* 리스트 */}
        {isLoding ? (
          <GridLoader
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="w-full h-[300px] flex flex-row justify-center bg-main">
            {lists.map((item) => (
              <Link to={`detail/${item.id}`} key={item.id}>
                <div className="w-full h-[300px] m-2 relative px-2 space-y-4 object-cover">
                  <img
                    className="w-full h-full rounded-md overflow-hidden"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w400${item.poster_path}`
                        : `https://image.tmdb.org/t/p/w400${item.profile_path}`
                    }
                    alt={item.title}
                  />
                  <h3 className="text-center font-bold">
                    {item.title ? `${item.title}` : `${item.name}`}
                  </h3>
                  <p className="text-sm text-center text-gray-500">
                    {item.release_date
                      ? `${item.release_date}`
                      : `${item.first_air_date}`}
                  </p>
                  {/* item.vote_average값이 존재하지 않으면 보여지지 않음 */}
                  {item.vote_average && (
                    <div className=" absolute bottom-0 left-1 rounded-full w-10 h-10 bg-gray-800 text-white font-bold flex justify-center items-center">
                      <CircularProgress
                        rate={`${Math.floor(item.vote_average * 10)}%`}
                      />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
