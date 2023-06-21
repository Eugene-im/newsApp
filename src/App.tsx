import { StoreProvider } from "easy-peasy";
import "./App.css";
import AppRouter from "./router/Router";
import { store } from "./store/store";

function App() {
  return (
    <StoreProvider store={store}>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
