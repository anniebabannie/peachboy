import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./pages/home.tsx"),
  route(":chapter/:page", "./pages/comic-page.tsx"),
] satisfies RouteConfig;
