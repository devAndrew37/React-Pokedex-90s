import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css"


const PokemonCard = ({ pokemon }) => {

const getPokemonSpriteUrl = (url) => {
  const id = url.split('/').filter(Boolean).pop();
  return `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${id}.png`;
};

 return (
  <Link to={`/pokemon?name=${pokemon.name}`}>
  <div className="pokemon-card">
   <img src={getPokemonSpriteUrl(pokemon.url)}
   alt={pokemon.name}
   />
   <h2>{pokemon.name}</h2>
  </div>
  </Link>
);
};

export default PokemonCard;