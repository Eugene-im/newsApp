import { useStoreRehydrated, useStoreState } from "easy-peasy";
import { Outlet } from "react-router-dom";
import { ErrorToast } from "./ErrorToast";
import { ArticlesStoreModel } from "../typesInterfaces";
import { Filter } from "./Filter";

export function Layout() {
  const { error } = useStoreState((state: ArticlesStoreModel) => state);
  const isRehydrated = useStoreRehydrated();
  return (
    <div className="App">
      <header className="App-header sticky top-0 z-50">Just NEWS</header>
      <Filter />
      {!!error && <ErrorToast message={error} />}
      <main>{isRehydrated ? <Outlet /> : <div>Loading...</div>}</main>
      <footer>© 2023</footer>
    </div>
  );
}
