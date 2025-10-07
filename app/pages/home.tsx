import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { ENV } from "../env";

export function meta({}: Route.MetaArgs) {
  return [
    { title: ENV.APP_NAME },
    { name: "description", content: `${ENV.APP_NAME} web comic reader` },
  ];
}

export default function Home() {
  return <Welcome />;
}
