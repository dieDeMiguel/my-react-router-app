import type { Route } from "./+types/api.skew-test";
import { addSkewProtectionHeaders } from "~/utils/skew-protection";

export function loader({ request }: Route.LoaderArgs) {
  // Create response headers
  const headers = new Headers();
  
  // Add skew protection headers (similar to Astro's implementation)
  addSkewProtectionHeaders(headers);
  
  // Add some additional headers for demonstration
  headers.set("Content-Type", "application/json");
  headers.set("Cache-Control", "no-cache");
  
  // Return response with deployment information
  const responseData = {
    message: "Skew protection test endpoint",
    timestamp: new Date().toISOString(),
    deployment: {
      id: process.env.VERCEL_DEPLOYMENT_ID || "local-dev",
      region: process.env.VERCEL_REGION || "local",
      skewProtectionEnabled: process.env.VERCEL_SKEW_PROTECTION_ENABLED === '1',
    },
    headers: {
      "x-deployment-id": headers.get("x-deployment-id") || "not-set",
    }
  };
  
  return new Response(JSON.stringify(responseData, null, 2), {
    headers: Object.fromEntries(headers),
  });
} 