import React, { useCallback, useEffect, useState } from "react";
import { GetRequest } from "../Fetchdata/GetRequest";
import Pagination from "./Pagination";
import { IoIosHeart } from "react-icons/io";
import "../ComponentCss/Movie.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [watchList, setWatchList] = useState([]);
  const [totalPages, setTotalPage] = useState();

  useEffect(() => {
    const fromLocalstorage = localStorage?.getItem("movieList");
    setWatchList(JSON.parse(fromLocalstorage));
  }, []);

  /**
   *! Getting movies from the TMDb
   */
  useEffect(() => {
    setLoader(true);
    GetRequest(page)
      .then((data) => {
        setMovies(data.results);
        setTotalPage(data.total_pages);
        setLoader(false);
      })
      .catch((error) => {
        setMovies(error);
        setLoader(false);
      });
  }, [page]);

  /**
   *! By toggling the icons we can add movies in watchList
   */
  const toggleWatchList = useCallback(
    (movie) => {
      const movieWatchList = watchList?.some((item) => item.id === movie.id);
      if (movieWatchList) {
        // console.log("watchlist");
        setWatchList((prevMovie) => {
          const listOfMovies =
            prevMovie.length > 0 && prevMovie?.filter((m) => m.id !== movie.id);
          localStorage.setItem("movieList", JSON.stringify(listOfMovies));

          return listOfMovies;
        });
      } else {
        setWatchList((prevMovie) => {
          // console.log("watchlist-added");
          const movieList =
            prevMovie?.length > 0 ? [...prevMovie, movie] : [movie];
          localStorage.setItem("movieList", JSON.stringify(movieList));

          return movieList;
        });
      }
    },
    [watchList]
  );

  return (
    <div>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="text-2xl mb-8 font-bold text-center mt-5 text-blue-500">
            Trending Movies
          </div>

          <div className="flex flex-wrap justify-center">
            {movies.length &&
              movies?.map((movie) => {
                const isInWatchList = watchList?.some(
                  (item) => item.id === movie.id
                );
                return (
                  <div
                    key={movie?.id}
                    className="w-[180px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative small-screen:w-[120px]"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})`,
                    }}
                  >
                    <div className="text-white bg-gray-900 opacity-60 text-center w-full rounded-b-xl font-bold text-sm absolute bottom-0">
                      {movie?.title}
                    </div>
                    <div className="absolute top-2 right-1 ">
                      {!isInWatchList ? (
                        <button
                          onClick={() => {
                            toggleWatchList(movie);
                          }}
                        >
                          <span>
                            <IoIosHeart
                              size={25}
                              className="fill-gray-300 bg-gray-900 rounded-xl p-1 opacity-80"
                            />
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            toggleWatchList(movie);
                          }}
                        >
                          <span>
                            <IoIosHeart
                              size={25}
                              color="red"
                              className=" bg-gray-900 rounded-xl p-1 opacity-80"
                            />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          <Pagination
            currPage={page}
            onPageChange={(page) => setPage(page)}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Movies;
