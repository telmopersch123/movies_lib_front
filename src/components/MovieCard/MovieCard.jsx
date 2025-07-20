import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

export default function MovieCard({ movie, showLink = true }) {
  return (
    <div className="movie-card">
      {movie.poster_path !== null ? (
        <img src={imageUrl + movie.poster_path} alt={movie.title} />
      ) : (
        <img
          style={{
            width: "100%", // ocupa toda a largura da div pai
            height: "150%", // ocupa toda a altura da div pai
            objectFit: "contain", // mantém proporção, cabe inteira dentro da div
            display: "block", // elimina espaços em branco extras (como inline images)
            margin: "0 auto", // centraliza horizontalmente
          }}
          src={
            "https://img.freepik.com/vetores-premium/nenhuma-imagem-vetorial-de-icone-de-fotos-pode-ser-usada-para-spa_120816-264914.jpg"
          }
          alt={movie.title}
        />
      )}

      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average.toFixed(1)}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
}
