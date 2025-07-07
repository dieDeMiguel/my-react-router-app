import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import { withSkewProtection } from "~/utils/skew-protection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Headers function to set skew protection headers for page responses
export function headers({ parentHeaders }: Route.HeadersArgs) {
  // Merge with parent headers to ensure skew protection is applied
  const headers = withSkewProtection(parentHeaders);
  
  // Add any route-specific headers here if needed
  // headers.set("Cache-Control", "max-age=3600");
  
  return headers;
}

// Fixed loader to return proper data
export function loader({ request }: Route.LoaderArgs) {
  // This is a page route, so we just return data for the component
  return { message: "Hello from loader!" };
}

export default function Home() {
  return <Welcome />;
}
