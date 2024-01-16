import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "react-js-pagination";
import "./Paging.css";
import CircularProgressbar from "../components/CircularProgressbar";

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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGE2YjA1MDkzYzU3NTZjYjdjZTY5MjE2ZjE2NTI2YyIsInN1YiI6IjVlY2NiODQ2MDIxY2VlMDAyMThhNmNkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O8NTSQ3WbjEipLHuOyR1hqkz2NSJCB-IP_4Q5M0hSsE",
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
          <div class="w-[1000px] flex flex-wrap gap-4 gap-y-8">
            {/* item */}
            {lists?.results?.map((list) => (
              <div
                key={list.id}
                className="w-[180px] h-[340px] rounded-lg shadow-lg overflow-hidden"
              >
                {/* 위: 그림 */}
                <div className="w-full h-[250px] bg-blue-500">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${list.poster_path}`}
                    alt="movieList"
                  />
                </div>
                {/* 아래: 내용 */}
                <div className="relative w-full h-[90px] pt-6 px-2">
                  <h2 className="font-semibold">{list.title.substr(1, 20)}</h2>
                  <p className="text-sm">{list.release_date}</p>
                  {/* 좋아요 평가 */}
                  <div className="absolute -top-5 left-2">
                    <CircularProgressbar
                      rate={Math.floor(list.vote_average * 10)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 페이지 네이션 */}
          <div className="pt-8">
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
