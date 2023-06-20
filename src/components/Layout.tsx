import { useStoreRehydrated } from "easy-peasy";
import { Outlet } from "react-router-dom";
import { ErrorToast } from "./ErrorToast";
import { Search } from "./Search";
import { store } from "../store";

export function Layout() {
  const { error } = store.getState();
  const isRehydrated = useStoreRehydrated();
  return (
    <div className="App">
      <header className="App-header">Just NEWS</header>
      <Search />
      {error && <ErrorToast message={error} />}
      <main>{isRehydrated ? <Outlet /> : <div>Loading...</div>}</main>
      <footer>© 2023</footer>
    </div>
  );
}
