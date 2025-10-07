import type { RouteObject } from "react-router";
import Home from "./pages/home";
import ComicPage from "./pages/comic-page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chapter-:chapter/:page",
    element: <ComicPage />,
  },
];

export default routes;
