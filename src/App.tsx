import { StoreProvider } from "easy-peasy";
import "./App.css";
import AppRouter from "./router";
import { store } from "./store";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <StoreProvider store={store}>
        <AppRouter />
      </StoreProvider>
    </React.StrictMode>
  );
}

export default App;
