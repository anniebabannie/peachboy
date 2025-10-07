import { type RouteConfig } from "@react-router/dev/routes";

export default [
	{
		id: "home",
		path: "/",
		file: "routes/home.tsx",
	},
	{
		id: "comic-page",
		path: "/chapter-:chapter/:page",
		file: "routes/comic-page.tsx",
	},
] satisfies RouteConfig;
