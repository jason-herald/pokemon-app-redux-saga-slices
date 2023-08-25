import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPokemonData,
  fetchMorePokemonData,
} from "../../store/pokemonActions";
import PokemonCard from "../../components/PokemonCard";

import "./ProductListingPage.css";

function ProductListingPage() {
  const dispatch = useDispatch();
  const pokemonDetails = useSelector((state) => state.pokemonList);
  const isLoadingMore = useSelector((state) => state.isLoadingMore);

  const observer = useRef(null);
  const loadMoreRef = useRef(null);
  useEffect(() => {
    if (pokemonDetails?.pokemonList.length === 0) {
      dispatch(fetchPokemonData());
    }
  }, [dispatch]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].isIntersecting && !isLoadingMore) {
        dispatch(fetchMorePokemonData());
      }
    });

    if (observer.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch, isLoadingMore]);
  console.log(pokemonDetails);
  return (
    <div className="pokemon-list-container">
      <h1>Pokémon List</h1>
      <div className="pokemon-card-grid">
        {pokemonDetails.pokemonList?.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div ref={loadMoreRef}>Loading more...</div>
    </div>
  );
}

export default ProductListingPage;
