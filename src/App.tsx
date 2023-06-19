import { StoreProvider } from "easy-peasy";
import "./App.css";
import AppRouter from "./router";
import { store } from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
