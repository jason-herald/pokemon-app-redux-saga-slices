import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPokemonData } from "../../store/pokemonActions";

import "./ProductDescriptionPage.css";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function ProductDescriptionPage() {
  const pokemonDetails = useSelector((state) => state.pokemonList);
  const { pokemonName } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemonDetails?.pokemonList.length === 0) {
      dispatch(fetchPokemonData());
      // API is called here to add data to store if page is reloaded
    }
  }, [dispatch]);
  const pokemon = pokemonDetails.pokemonList?.find(
    (pokemon) => pokemon.name === pokemonName
  )?.details;

  return (
    <div className="product-description-container">
      <h1 className="product-description-header">Pokémon Details</h1>
      {pokemon && (
        <div className="pokemon-details">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <img
            src={`${IMAGE_URL}${String(pokemon.id).padStart(3, "0")}.png`}
            alt={pokemon.name}
          />
          <p className="pokemon-id">ID: {pokemon.id}</p>
          <p className="pokemon-property">Height: {pokemon.height}</p>
          <p className="pokemon-property">Weight: {pokemon.weight}</p>
          <p className="pokemon-property">Abilities:</p>
          <ul className="abilities-list">
            {pokemon.abilities.map((ability) => (
              <li className="ability-item" key={ability.ability.name}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductDescriptionPage;
