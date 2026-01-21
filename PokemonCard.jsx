import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css"


const PokemonCard = ({ pokemon }) => {

const getPokemonSpriteUrl = (url) => {
  const id = url.split('/').filter(Boolean).pop();
  return `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${id}.png`;
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

  return (
    <Link to={`/pokemon?name=${pokemon.name}`}>
      <div className="pokemon-card">
        <p style={{fontWeight:"bolder", fontSize: "16px"}}>#{pokemon.id}</p>
        <img
          src={getPokemonSpriteUrl(pokemon.url)}
          alt={pokemon.name}
        />
        <h2>{capitalize(pokemon.name)}</h2>
      </div>
    </Link>
  );
};

export default PokemonCard;