import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemonList: [],
  isLoadingMore: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      if (state.isLoadingMore) {
        state.pokemonList.push(...action.payload);
        state.isLoadingMore = false;
      } else {
        state.pokemonList = action.payload;
      }
    },
    setIsLoadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
  },
});

export const { setPokemonList, setIsLoadingMore } = pokemonSlice.actions;

export default pokemonSlice.reducer;
