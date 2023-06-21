import { Routes, Route, BrowserRouter } from "react-router-dom";
import { routes } from "./urls";
import { NoMatch } from "../components/NoMatch";
import { NewsDetails } from "../components/NewsDetails";
import { Layout } from "../components/Layout";
import InfiniteScroll from "../components/InfiniteScroll";

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<InfiniteScroll />} />
            <Route path={routes.newsDetail} element={<NewsDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


