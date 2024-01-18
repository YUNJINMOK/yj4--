import { useEffect, useState } from "react";
import CircularProgress from "../components/CircularProgress";
import Layout from "../components/Layout";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import "./Paging.css";

export default function Movies() {
  const [lists, setLists] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
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
        console.log(json);
        setLists(json);
      })
      .catch((err) => console.error("error:" + err));
  }, [page]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col items-center justify-center py-16">
          <div className="w-[1000px] flex flex-wrap gap-4 gap-y-8">
            {/* item */}
            {lists?.results?.map((list) => (
              <Link to={`/detail/${list.id}`} key={list.id}>
                <div className="w-[180px] h-[340px] overflow-hidden rounded-lg shadow-xl">
                  {/* TopPic */}
                  <div className="w-full h-[250px]">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w400${list.poster_path}`}
                      alt=""
                    />
                  </div>

                  {/* Content */}
                  <div className="relative w-fill h-[90px] pt-4 px-2">
                    <h2 className="font-semibold">
                      {list.title.substr(1, 20)}
                    </h2>
                    <p className="text-sm">{list.release_date}</p>
                    {/* review */}
                    <div className=" absolute -top-5 left-2">
                      <CircularProgress
                        rate={`${parseInt(
                          Math.floor(list.vote_average * 10)
                        )}%`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* pageNation */}
          <div className="pt-8">
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={lists?.total_pages}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
