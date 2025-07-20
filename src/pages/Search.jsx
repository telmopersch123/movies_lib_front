import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";

import { Mosaic } from "react-loading-indicators";

import "./Movie.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [search, setSearch] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;
    const getSearch = async () => {
      const url = `${searchURL}?${apiKey}&query=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();

      setSearch(data);
    };

    getSearch();
  }, [query]);

  if (!search)
    return (
      <>
        <div style={{ height: "90vh" }} className="mosaic-loader">
          <Mosaic color="#e50914" size="medium" text="" textColor="" />
        </div>
      </>
    );

  if (search.status_code === 34 || search.results.length === 0)
    return <p className="not-found-message">Filme não encontrado...</p>;

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {search.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
