import { Routes, Route, BrowserRouter } from "react-router-dom";
import { routes } from "./urls";
import SkeletonLoading from "../components/SkeletonLoading";
import { NoMatch } from "../components/NoMatch";
import { NewsDetails } from "../components/NewsDetails";
import { Layout } from "../components/Layout";

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<SkeletonLoading />} />
            <Route path={routes.newsDetail} element={<NewsDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


