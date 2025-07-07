# Vercel Skew Protection Implementation

This React Router app implements Vercel skew protection similar to Astro's approach, ensuring that users get consistent responses from the same deployment during rolling updates.

## What is Skew Protection?

Skew protection prevents users from experiencing inconsistent behavior during deployments by ensuring they continue to receive responses from the same deployment version until their session naturally expires.

## Implementation

### 1. Vercel Configuration (`vercel.json`)

```json
{
  "regions": ["all"],
  "skewProtection": {
    "enabled": true
  }
}
```

### 2. Utility Functions (`app/utils/skew-protection.ts`)

The implementation provides two utility functions:

- `addSkewProtectionHeaders(headers: Headers)`: Adds the `x-deployment-id` header when conditions are met
- `withSkewProtection(headers?: Headers)`: Returns headers with skew protection applied

### 3. Route-Level Implementation

#### API Routes

For API routes, return a `Response` object with headers:

```typescript
import { addSkewProtectionHeaders } from "~/utils/skew-protection";

export function loader({ request }: Route.LoaderArgs) {
  const headers = new Headers();
  addSkewProtectionHeaders(headers);
  headers.set("Content-Type", "application/json");
  
  return new Response(JSON.stringify({ data: "example" }), {
    headers: Object.fromEntries(headers),
  });
}
```

#### Page Routes

For page routes that need to set headers:

```typescript
import { withSkewProtection } from "~/utils/skew-protection";

export function loader({ request }: Route.LoaderArgs) {
  const headers = withSkewProtection();
  
  return new Response(JSON.stringify({ data: "example" }), {
    headers: {
      ...Object.fromEntries(headers),
      "Content-Type": "application/json",
    },
  });
}
```

## Environment Variables

The implementation checks for these Vercel environment variables:

- `VERCEL_SKEW_PROTECTION_ENABLED`: Must be `'1'` to enable skew protection
- `VERCEL_DEPLOYMENT_ID`: The unique deployment identifier

## Testing

### Local Development

In local development, skew protection headers won't be set because the Vercel environment variables aren't present. You can test the API endpoint:

```bash
curl -I http://localhost:5173/api/skew-test
```

### Production Testing

Once deployed to Vercel, the headers will be automatically added when skew protection is enabled:

```bash
curl -I https://your-app.vercel.app/api/skew-test
```

You should see the `x-deployment-id` header in the response.

## Example Routes

### API Test Route (`/api/skew-test`)

A demonstration route that shows:
- Current deployment information
- Whether skew protection is enabled
- The deployment ID being used

### Home Route (`/`)

The home route demonstrates how to add skew protection to a regular page route.

## How It Works

1. **Condition Check**: The utility functions check if `VERCEL_SKEW_PROTECTION_ENABLED === '1'` and `VERCEL_DEPLOYMENT_ID` exists
2. **Header Addition**: If conditions are met, adds `x-deployment-id` header with the deployment ID
3. **Vercel Processing**: Vercel's infrastructure uses this header to route subsequent requests to the same deployment

## Benefits

- **Consistency**: Users experience consistent behavior during deployments
- **Reliability**: Prevents mixed-version responses that could cause errors
- **Seamless Updates**: Deployments can roll out gradually without affecting active users
- **Automatic**: Works automatically once configured, no manual intervention needed

## Comparison with Astro

This implementation mirrors Astro's approach:

```javascript
// Astro's implementation
if (skewProtection && process.env.VERCEL_SKEW_PROTECTION_ENABLED === '1') {
  req.headers['x-deployment-id'] = process.env.VERCEL_DEPLOYMENT_ID;
}
```

Our React Router implementation provides the same functionality through utility functions that can be used in loaders and actions. 