import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  //console.log(location.search);
  const search = new URLSearchParams(location.search);
  const keyword = search.get("keyword");
  const [data, setData] = useState([]);
  let tabs = [
    { id: "tv", label: "TV show" },
    { id: "movie", label: "Movies" },
    { id: "person", label: "People" },
    { id: "collection", label: "Collections" },
    { id: "company", label: "Companies" },
    { id: "keyword", label: "Keywords" },
    { id: "network", label: "Networks" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/${activeTab}?query=${keyword}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGFhYmZkZTlmNGY0MGNjYzVjYmM0ZjFjODE4MTUyYiIsInN1YiI6IjY1OWNhMDFjYjZjZmYxMDI1Yjk0YjJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfPbGJ-c_OzNonXxiGhS3SIVm8XFK8o5NowWRYXwoIs",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        console.log(json.total_results);
      })
      .catch((err) => console.error("error:" + err));
  }, [activeTab, keyword]);

  return (
    <Layout>
      <div className="w-full flex justify-center py-16">
        <div className="w-[1400px]  flex justify-center">
          {/* Search Results */}
          <div className="w-[300px] h-[480px] flex flex-col bg-white font-semibold border border-gray-300 mr-8 rounded-3xl overflow-hidden">
            <h2 className="w-full h-[80px] text-left bg-blue-400 items-center p-6 mb-2 text-xl">
              Search Results
            </h2>
            {tabs.map((tab) => (
              <button
                className="w-full p-4 bg-gray-100 text-left hover:bg-gray-300 transition duration-300"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* list */}
          <div className="w-[1000px] ">
            <div className="space-y-10 ">
              {data.map((item) => (
                <div className="w-[100%] h-[150px] flex rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                  <img
                    className="w-[10%] flex flex-col object-cover"
                    src={`https://image.tmdb.org/t/p/w200${
                      item.poster_path || item.profile_path || item.logo_path
                    }`}
                    alt=""
                  />
                  <div className="w-[90%]">
                    <div className=" flex flex-col space-y-2 justify-center m-2 ">
                      <p className="font-semibold">
                        {item.title ? item.title : item.name}
                      </p>
                      <p className="text-[14px]">
                        {item.release_date || item.first_air_date}
                      </p>
                      <p className="text-[12px]">{item.overview}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
