import { useStoreRehydrated, useStoreState } from "easy-peasy";
import { Outlet } from "react-router-dom";
import { ArticlesStoreModel } from "../typesInterfaces";
import { ErrorToast } from "./ErrorToast";
import { Search } from "./Search";

export function Layout() {
  const { error } = useStoreState((state: ArticlesStoreModel) => state);
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
