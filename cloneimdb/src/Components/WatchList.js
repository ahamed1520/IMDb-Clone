import React, { useCallback, useEffect, useState } from "react";
import { genreids } from "../Helper/GenerHelper";
import { BiSolidUpArrowCircle, BiSolidDownArrowCircle } from "react-icons/bi";

const WatchList = () => {
  const [favMovies, setfavMovies] = useState([]);
  const [gener, setgener] = useState([]);
  const [loader, setloader] = useState(true);
  const [currGener, setcurrGener] = useState("Geners");
  const [filterMovies, setfilterMovies] = useState([]);

  /**
   * ! It will get the data from localstorage while clicking favorite icon and update in watchList page.
   */
  useEffect(() => {
    setloader(true);
    if (localStorage.getItem("movieList")) {
      const movies = JSON.parse(localStorage.getItem("movieList"));
      setfavMovies(movies);
      setfilterMovies(movies);
      const listOfGeners = new Set(
        movies.map((movies) => genreids[movies.genre_ids[0]])
      );
      setgener(() => ["Geners", ...listOfGeners]);
      // console.log(JSON.parse(localStorage.getItem("movieList")));
    }
    setloader(false);
  }, []);

  /**
   * ! It will delete the data from localstorage while clicking delete button and update in watchList page.
   */
  const deleteMovie = useCallback(
    (movie) => {
      const filterMovies = favMovies?.filter((m) => m.id !== movie.id);
      setfavMovies(filterMovies);
      setfilterMovies(filterMovies);
      const listOfGeners = new Set(
        filterMovies.map((movies) => genreids[movies.genre_ids[0]])
      );
      setgener(() => ["Geners", ...listOfGeners]);
      localStorage.setItem("movieList", JSON.stringify(filterMovies));
    },
    [favMovies]
  );

  /**
   *! It will update the data from localstorage while clicking favorite icon and update in watchList page.
   */
  const currGenerHandler = useCallback(
    (gener) => {
      // console.log(gener);
      setcurrGener(gener);
      let filterMovies = [];
      if (gener === "Geners") {
        filterMovies = favMovies;
      } else {
        filterMovies = favMovies.filter(
          (m) => genreids[m?.genre_ids[0]] === gener
        );
      }
      setfilterMovies(filterMovies);
    },
    [favMovies]
  );
  const filterByGener = useCallback(
    (event) => {
      const value = event.target.value;
      currGenerHandler(value);
    },
    [currGener, currGenerHandler]
  );

  const sortHandler = useCallback(
    (sort) => {
      let sortedData = [];
      if (sort === "ascending") {
        sortedData = filterMovies.sort((a, b) => {
          return a.vote_average - b.vote_average;
        });
      } else {
        sortedData = filterMovies.sort((a, b) => {
          return b.vote_average - a.vote_average;
        });
      }
      setfilterMovies([...sortedData]);
    },
    [filterMovies]
  );
  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="border border-gray-300 shadow-md m-1 rounded-md small-screen:m-5">
          <table className="w-full border-collapse bg-black text-left text-xs text-gray-300 small-screen:text-sm ">
            <thead>
              <tr>
                <th className=" text-center">Name</th>
                <th className=" flex middle-screen:gap-2 ">
                  <BiSolidUpArrowCircle
                    size={25}
                    onClick={() => sortHandler("ascending")}
                  />
                  Rating
                  <BiSolidDownArrowCircle
                    size={25}
                    onClick={() => sortHandler("desending")}
                  />
                </th>
                <th>Popularity</th>
                <th>Release Date</th>
                <th>
                  <select onChange={filterByGener} className="focus bg-black">
                    {gener?.length > 0 &&
                      gener.map((eachGener, idx) => {
                        return <option key={idx}>{eachGener}</option>;
                      })}
                  </select>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterMovies?.length > 0 &&
                filterMovies?.map((movie) => {
                  return (
                    <tr key={movie?.id}>
                      <td className="flex flex-col items-center space-x-2 px-5 py-6 middle-screen:flex-row">
                        <img
                          src={`https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})`}
                          className="h-[8rem] w-[8rem] rounded-md middle-screen:h-[10rem]"
                          alt=""
                        />
                        <div>{movie?.title}</div>
                      </td>
                      <td>{movie?.vote_average}</td>
                      <td>{movie?.popularity}</td>
                      <td>{movie?.release_date}</td>
                      <td>{genreids[movie.genre_ids[0]]}</td>
                      <td>
                        <button
                          className="text-red-600  rounded-md p-2 hover:bg-red-600 hover:text-white"
                          onClick={() => {
                            deleteMovie(movie);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default WatchList;
