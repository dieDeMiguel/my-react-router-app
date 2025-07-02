# Vercel Regional Deployment Demo

This demo showcases Vercel's powerful regional deployment capabilities by serving personalized content based on the user's geographic location.

## Features Demonstrated

### 🌍 Geolocation Detection
- Automatic detection of user's country, region, and city
- Timezone identification
- Real-time location-based content personalization

### ⚡ Edge Runtime
- Ultra-fast response times from the nearest edge location
- Global distribution across Vercel's edge network
- Minimal latency regardless of user location

### 🎯 Content Personalization
- Country-specific greetings in local languages
- Regional currency display
- Custom styling based on location
- Flag and cultural elements

## Technical Implementation

### Vercel Headers Used
The demo leverages Vercel's built-in geolocation headers:
- `x-vercel-ip-country` - ISO country code
- `x-vercel-ip-country-region` - Region/state information
- `x-vercel-ip-city` - City name
- `x-vercel-ip-timezone` - User's timezone

### Environment Variables
- `VERCEL_REGION` - Deployment region identifier
- Edge runtime detection for optimal performance

### Configuration
The `vercel.json` file configures:
- Edge runtime for the regional demo route
- Global region deployment (`"regions": ["all"]`)
- Optimized caching headers

## Supported Countries
The demo includes localized content for:
- 🇺🇸 United States (English)
- 🇬🇧 United Kingdom (English)
- 🇩🇪 Germany (German)
- 🇫🇷 France (French)
- 🇯🇵 Japan (Japanese)
- 🇨🇦 Canada (English)
- 🇦🇺 Australia (English)
- 🇧🇷 Brazil (Portuguese)
- 🇮🇳 India (Hindi)
- 🇨🇳 China (Chinese)

Plus fallback support for any other country.

## How to Test

### Local Development
```bash
npm run dev
```
Visit `http://localhost:5173/regional-demo`

*Note: In local development, geolocation headers won't be available, so you'll see "Unknown" values.*

### Production Testing
1. Deploy to Vercel
2. Visit your deployed URL + `/regional-demo`
3. Test from different locations using:
   - VPN services
   - Different devices/networks
   - Vercel's preview deployments

### Testing Different Locations
To test the geolocation features:
1. Use a VPN to simulate different countries
2. Ask friends in different countries to test
3. Use browser developer tools to simulate different locations (limited effectiveness)

## Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup
No additional environment variables are required. Vercel automatically provides:
- Geolocation headers in production
- Edge runtime capabilities
- Global CDN distribution

## Performance Benefits

### Edge Computing Advantages
- **Reduced Latency**: Content served from the nearest edge location
- **Improved TTFB**: Time to First Byte optimized globally
- **Scalability**: Automatic scaling across regions
- **Reliability**: Distributed infrastructure reduces single points of failure

### Caching Strategy
- Server-side caching with `s-maxage=60`
- Stale-while-revalidate for optimal user experience
- Edge-level caching for maximum performance

## Use Cases

This pattern is perfect for:
- **E-commerce**: Show local currency, shipping options, and regulations
- **Content Platforms**: Serve region-appropriate content and languages
- **SaaS Applications**: Display relevant features and pricing by region
- **Marketing Sites**: Localized campaigns and messaging
- **Compliance**: Meet regional data and content requirements

## Next Steps

To extend this demo:
1. Add more countries and languages
2. Integrate with a translation service
3. Add region-specific product catalogs
4. Implement A/B testing by region
5. Add analytics to track regional performance

## Resources

- [Vercel Edge Functions Documentation](https://vercel.com/docs/functions/edge-functions)
- [Vercel Geolocation Headers](https://vercel.com/docs/functions/edge-functions/edge-functions-api#request-headers)
- [React Router Documentation](https://reactrouter.com/docs) 