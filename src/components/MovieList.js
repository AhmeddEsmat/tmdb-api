import { useState } from "react";
import axios from "axios";

// API Key: 3a0c224341c6a74e0c63bd9a5f749ffd

export default function MovieList() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=3a0c224341c6a74e0c63bd9a5f749ffd&query=${search}`;
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
      console.log(movies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
