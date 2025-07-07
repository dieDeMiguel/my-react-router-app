import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import { withSkewProtection } from "~/utils/skew-protection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Example loader with skew protection headers
export function loader({ request }: Route.LoaderArgs) {
  // Create headers with skew protection
  const headers = withSkewProtection();
  
  // For data routes, we can return a Response with headers
  return new Response(JSON.stringify({ message: "Hello from loader!" }), {
    headers: {
      ...Object.fromEntries(headers),
      "Content-Type": "application/json",
    },
  });
}

export default function Home() {
  return <Welcome />;
}
