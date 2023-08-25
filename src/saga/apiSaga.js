import { all, call, put, takeEvery, select } from "redux-saga/effects";

import { fetchPokemonList, fetchPokemonDetails } from "../helpers/api";
import { setPokemonList, setIsLoadingMore } from "../store/pokemonSlice";

function* fetchPokemonDataSaga() {
  try {
    const data = yield call(fetchPokemonList);
    const pokemonWithDetails = yield all(
      data.map(function* (pokemon) {
        const details = yield call(fetchPokemonDetails, pokemon.name);
        return { ...pokemon, details };
      })
    );

    yield put(setPokemonList(pokemonWithDetails));
  } catch (error) {
    console.log("error", error);
  }
}
function* fetchMorePokemonDataSaga() {
  try {
    const isDataFetched = yield select((state) => state.pokemonList.length > 0);

    if (!isDataFetched) {
      yield put(setIsLoadingMore(true));

      const currentPokemonList = yield select(
        (state) => state.pokemonList.pokemonList
      );
      const offset = currentPokemonList.length;
      console.log(offset);

      const data = yield call(fetchPokemonList, offset);
      const pokemonWithDetails = yield all(
        data.map(function* (pokemon) {
          const details = yield call(fetchPokemonDetails, pokemon.name);
          return { ...pokemon, details };
        })
      );

      yield put(setPokemonList(pokemonWithDetails));
      yield put(setIsLoadingMore(false));
    }
  } catch (error) {
    console.log(error);
    yield put(setIsLoadingMore(false));
  }
}

export function* apiSaga() {
  yield takeEvery("FETCH_POKEMON_DATA", fetchPokemonDataSaga);
  yield takeEvery("FETCH_MORE_POKEMON_DATA", fetchMorePokemonDataSaga);
}
