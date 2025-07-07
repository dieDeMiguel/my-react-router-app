/**
 * Adds Vercel skew protection headers to the response
 * Similar to Astro's implementation
 */
export function addSkewProtectionHeaders(headers: Headers): void {
  // Check if skew protection is enabled and deployment ID is available
  if (
    process.env.VERCEL_SKEW_PROTECTION_ENABLED === '1' && 
    process.env.VERCEL_DEPLOYMENT_ID
  ) {
    headers.set('x-deployment-id', process.env.VERCEL_DEPLOYMENT_ID);
  }
}

/**
 * Middleware function that can be used in loaders/actions
 */
export function withSkewProtection(headers: Headers = new Headers()): Headers {
  addSkewProtectionHeaders(headers);
  return headers;
} 