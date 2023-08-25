import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import pokemonReducer from "./pokemonSlice";
import { rootSaga } from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    pokemonList: pokemonReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
