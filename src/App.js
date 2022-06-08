import React, { useEffect, useState } from "react";

import MovieCard from "./components/MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

//API link
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=ac5de0e6";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("spider")

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  //calling API using useEffect on document loading start
  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);
  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input
          type="text"
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies({searchTerm})} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie1={movie} />;
          })}
        </div>
      ) : (
        <div>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
