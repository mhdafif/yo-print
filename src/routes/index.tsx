import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const SearchPage = lazy(() =>
  import("../pages/search/SearchPage").then((module) => ({
    default: module.SearchPage,
  }))
);
const AnimeDetailPage = lazy(() =>
  import("../pages/detail/AnimeDetailPage").then((module) => ({
    default: module.AnimeDetailPage,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/anime/:id",
    element: <AnimeDetailPage />,
  },
]);
