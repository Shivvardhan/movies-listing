import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/moviesSlice";
import MovieCard from "./components/MovieCard";

const App = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 25;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const totalPages = Math.ceil(data.length / perPage);

  const movieData = data.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🎥 Movie Database
      </h1>

      {loading && (
        <p className="text-center text-blue-500">Loading movies...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-6 justify-center mb-8">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} props={movie} />
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-200 text-gray-800"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
