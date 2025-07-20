import { useEffect, useState } from "react";
import { BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { Mosaic } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import translateText from "../utils/translateText";

import formatNumber from "../utils/formatNumber";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [callAPI, setCallAPI] = useState(false);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  useEffect(() => {
    if (callAPI && movie && !translatedTitle) {
      const translate = async () => {
        const traductionOverview = await translateText(movie.overview);
        setTranslatedTitle(traductionOverview);
      };
      translate();
    }
  }, [callAPI, movie, translatedTitle]);

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
  }, [id]);

  return (
    <>
      {movie && (
        <div className="movie-container">
          <div className="movie-header">
            <img src={imageUrl + movie.poster_path} alt={movie.title} />

            <div className="movie-details">
              <h1>{movie.title}</h1>
              <div className="rating">
                <FaStar className="star-icon" />
                <span>{movie.vote_average.toFixed(1)} / 10</span>
              </div>
              <p className="paragrafo">
                <BsWallet2 /> Orcamento: {formatNumber(Number(movie.budget))}
              </p>
              <p className="paragrafo">
                <BsGraphUp /> Receita: {formatNumber(movie.revenue)}
              </p>
              <p className="paragrafo">
                <BsHourglassSplit /> Duração: {movie.runtime} Minutos
              </p>
              <div className="sinopse-container">
                {callAPI === true ? (
                  translatedTitle !== null ? (
                    <div>
                      <p>Sinopse:</p>
                      <p style={{ textAlign: "justify" }}>{translatedTitle}</p>
                    </div>
                  ) : (
                    <div>
                      <p>Sinopse:</p>
                      <div className="mosaic-loader">
                        <Mosaic
                          color="#e50914"
                          size="medium"
                          text=""
                          textColor=""
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <div>
                    <p>Sinopse:</p>
                    <p style={{ textAlign: "justify" }}>{movie.overview}</p>
                  </div>
                )}
                <button
                  onClick={() => setCallAPI(true)}
                  className="watch-button"
                >
                  <MdGTranslate />
                  <span className="watch-button-text">Traduzir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
