import type { RouteObject } from "react-router";
import Home from "./routes/home";
import ComicPage from "./routes/comic-page";

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
