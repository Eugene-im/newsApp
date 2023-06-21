import { useStoreRehydrated, useStoreState } from "easy-peasy";
import { Outlet } from "react-router-dom";
import { ErrorToast } from "./ErrorToast";
import { ArticlesStoreModel } from "../typesInterfaces";

export function Layout() {
  const { error } = useStoreState((state: ArticlesStoreModel) => state);

  const isRehydrated = useStoreRehydrated();
  
  return (
    <div className="App">
      <header className="App-header sticky top-0 z-50">Just NEWS</header>
      {!!error && <ErrorToast message={error} />}
      <main>{isRehydrated ? <Outlet /> : <div>Loading...</div>}</main>
      <footer>© 2023</footer>
    </div>
  );
}
