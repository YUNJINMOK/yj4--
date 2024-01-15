import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Changeruntime from "../Changeruntime";
import CircularProgressbar from "../components/CircularProgressbar";
import { FaList } from "react-icons/fa";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDhlZDYzMTQ4MTVmYjlmODcyM2VhMGIwZTU3NWViNiIsInN1YiI6IjY1OWNhMjdkNjJmY2QzMDE0OTUyMjk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iGJvW0IM5FbXBZ9tfWZbfa7AzjiPk4pTBB50DuiGNRM",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((err) => console.error("error:" + err));
  }, [id]);
  return (
    <Layout>
      <div className="w-full h-[500px] flex justify-center relative">
        <div className=" absolute top-0 left-0 w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt="backImage"
          />
        </div>
        {/* 필터기능 */}
        <div className=" absolute top-0 left-0 w-full h-full bg-gray-900/90 flex justify-center">
          <div className="w-[1300px] h-full flex">
            {/* 왼쪽:이미지 */}
            <div className="w-1/4 h-full flex items-center ">
              <div className="w-[80%] h-[80%]">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                  alt="mainimage"
                />
              </div>
            </div>
            {/* 오른쪽: 설명 */}
            <div className="w-3/4 h-full flex flex-col justify-center text-white">
              <div className="flex space-x-2">
                <h1 className="font-bold text-3xl">{data?.title}</h1>
                <h2 className="text-2xl">
                  ({data?.release_date.split("-")[0]})
                </h2>
              </div>
              {/* 장르 러닝타임 */}
              <div className="flex space-x-2">
                <span>{data?.release_date.replaceAll("-", "/")}</span>
                {/*  구분자 */}
                <span>•</span>
                {/* 장르 */}
                <span className=" space-x-2">
                  {data?.genres?.map((genres) => (
                    <span key={genres.name}>{genres.name}</span>
                  ))}
                </span>
                {/*  구분자 */}
                <span>•</span>
                {/* 러닝 타임 */}
                <span className=" flex space-x-2">
                  {Changeruntime(data?.runtime)}
                </span>
              </div>
              {/* 서큘러 */}
              <div className="flex space-x-4">
                <CircularProgressbar
                  rate={Math.floor(data?.vote_average * 10)}
                />
                <div className="w-[35px] text-center">회원 점수</div>
                <div className="w-[40px] h-[40px] rounded-full bg-gray-950 text-white flex justify-center items-center">
                  <FaList />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-gray-950 text-white flex justify-center items-center">
                  <FaList />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-gray-950 text-white flex justify-center items-center">
                  <FaList />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-gray-950 text-white flex justify-center items-center">
                  <FaList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
