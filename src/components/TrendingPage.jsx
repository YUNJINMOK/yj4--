import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TrendingPage() {
  const [lists, setLists] = useState([]);
  console.log(lists);

  let tabs = [
    { id: "all", label: "All" },
    { id: "movie", label: "Movies" },
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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGE2YjA1MDkzYzU3NTZjYjdjZTY5MjE2ZjE2NTI2YyIsInN1YiI6IjVlY2NiODQ2MDIxY2VlMDAyMThhNmNkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O8NTSQ3WbjEipLHuOyR1hqkz2NSJCB-IP_4Q5M0hSsE",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setLists(json?.results.slice(0, 7));
      })
      .catch((err) => console.error("error:" + err));
  }, [activeTab]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1300px] h-[400px] pt-8 space-y-4">
        {/* 타이틀 */}
        <div className="flex">
          <h2 className="px-4 py-2 font-medium text-[24px]">Trending</h2>
          {/* 탭바 */}
          <div className="border-2 border-gray-900 rounded-3xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? "text-white" : "text-black"
                } relative
                        rounded-full px-6 py-2.5 text-xl font-semibold transition
                        `}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-gray-900 rounded-3xl -z-10"
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 리스트 */}
        <div className="flex w-full h-[350px] justify-around mt-4 bg-main overflow-hidden">
          {lists.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <div key={item.id} className="w-[150px] h-[250px] rounded-xl">
                <img
                  className="w-[150px] h-[225px]  object-cover"
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  alt=""
                />

                <h3 className=" text-black text-center font-bold">
                  {item.name}
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
