import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import changeRuntime from "../lib/changeRuntime";
import CircularProgress from "../components/CircularProgress";

export default function Detail(){
    const {id} = useParams()
    const [data, setData] = useState()
    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGE2YjA1MDkzYzU3NTZjYjdjZTY5MjE2ZjE2NTI2YyIsInN1YiI6IjVlY2NiODQ2MDIxY2VlMDAyMThhNmNkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O8NTSQ3WbjEipLHuOyR1hqkz2NSJCB-IP_4Q5M0hSsE'
            }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setData(json)
        })
        .catch(err => console.error('error:' + err));
    }, [id])
    return (
        <Layout>
        <div className="relative w-full h-[500px] flex justify-center">
            {/* backdrop_path 이미지 */}
            <div className="absolute top-0 left-0 w-full h-full">
                <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="backimage" />
            </div>
            {/* 필터기능 div */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/90 flex justify-center">
                <div className="w-[1300px] h-full flex">
                    {/* 왼쪽: 이미지 */}
                    <div className="w-1/4 h-full flex items-center">
                        <div className="w-[80%] h-[80%]">
                            <img 
                            className="w-full h-full object-cover"
                            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} alt="mainimage" />
                        </div>
                    </div>
                    {/* 오른쪽: 설명 */}
                    <div className="w-3/4 h-full flex flex-col justify-center text-white">
                        {/* 제목 */}
                        <div className="flex space-x-2">
                            <h1 className="font-bold text-3xl">{data?.title}</h1>
                            <h2 className="text-2xl">
                                ({data?.release_date.split("-")[0]})
                            </h2>
                        </div>
                        {/* 장르 러닝타임 */}
                        <div className="flex space-x-2">
                            {/* 개봉일 */}
                            <span>{data?.release_date.replaceAll("-", "/")}</span>
                            {/* 구분자 */}
                            <span>•</span>
                            {/* 장르 */}
                            <span className="space-x-2">
                                {data?.genres?.map(genre => (
                                    <span key={genre.name}>{genre.name}</span>
                                ))}
                            </span>
                            {/* 구분자 */}
                            <span>•</span>
                            {/* 러닝타임 */}
                            <span>{changeRuntime(data?.runtime)}</span>
                        </div>
                        {/* favorite */}
                        <div>
                            <CircularProgress rate={Math.floor(data?.vote_average * 10)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}