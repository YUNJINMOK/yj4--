import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

export default function Item({ list }) {
  return (
    <Link to={`/detail/${list.id}`} key={list.id}>
      <div className="w-[180px] h-[340px] overflow-hidden rounded-lg shadow-xl">
        {/* TopPic */}
        <div className="w-full h-[250px]">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w400${
              list.poster_path ? list.poster_path : list.backdrop_path
            }`}
            alt=""
          />
        </div>

        {/* Content */}
        <div className="relative w-fill h-[90px] pt-4 px-2">
          <h2 className="font-semibold">
            {list.title ? list.tile : list.name.substr(1, 20)}
          </h2>
          <p className="text-sm">
            {list.release_date ? list.release_date : list.first_air_date}
          </p>
          {/* review */}
          <div className=" absolute -top-5 left-2">
            <CircularProgress
              rate={`${parseInt(Math.floor(list.vote_average * 10))}%`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
