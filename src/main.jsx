import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage/ProductDescriptionPage";
import store from "./store/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<ProductListingPage />} />
        <Route
          path="/pokemon/:pokemonName"
          element={<ProductDescriptionPage />}
        />
      </Routes>
    </Provider>
  </Router>
);
