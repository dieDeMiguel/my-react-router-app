import type { Route } from "./+types/regional-demo";
import { withSkewProtection } from "~/utils/skew-protection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vercel Regional Demo" },
    { name: "description", content: "Demo of Vercel's regional deployment capabilities" },
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

export async function loader({ request }: Route.LoaderArgs) {
  // Get geolocation data from Vercel's edge runtime
  const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
  const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown';
  const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
  const timezone = request.headers.get('x-vercel-ip-timezone') || 'UTC';
  
  // Get the deployment region from Vercel
  const deploymentRegion = process.env.VERCEL_REGION || 'local';
  
  return {
    country,
    region,
    city,
    timezone,
    deploymentRegion,
    timestamp: new Date().toISOString(),
  };
}

export default function RegionalDemo({ loaderData }: Route.ComponentProps) {
  const { country, region, city, timezone, deploymentRegion, timestamp } = loaderData;

  // Country-specific content
  const getCountryContent = (countryCode: string) => {
    const content: Record<string, { greeting: string; currency: string; flag: string; color: string }> = {
      'US': { greeting: 'Hello from the United States!', currency: 'USD', flag: '🇺🇸', color: 'bg-blue-500' },
      'GB': { greeting: 'Hello from the United Kingdom!', currency: 'GBP', flag: '🇬🇧', color: 'bg-red-500' },
      'DE': { greeting: 'Hallo aus Deutschland!', currency: 'EUR', flag: '🇩🇪', color: 'bg-yellow-500' },
      'FR': { greeting: 'Bonjour de France!', currency: 'EUR', flag: '🇫🇷', color: 'bg-blue-600' },
      'JP': { greeting: 'こんにちは日本から!', currency: 'JPY', flag: '🇯🇵', color: 'bg-red-600' },
      'CA': { greeting: 'Hello from Canada!', currency: 'CAD', flag: '🇨🇦', color: 'bg-red-700' },
      'AU': { greeting: 'G\'day from Australia!', currency: 'AUD', flag: '🇦🇺', color: 'bg-green-600' },
      'BR': { greeting: 'Olá do Brasil!', currency: 'BRL', flag: '🇧🇷', color: 'bg-green-500' },
      'IN': { greeting: 'नमस्ते भारत से!', currency: 'INR', flag: '🇮🇳', color: 'bg-orange-500' },
      'CN': { greeting: '你好来自中国!', currency: 'CNY', flag: '🇨🇳', color: 'bg-red-500' },
    };
    
    return content[countryCode] || { 
      greeting: `Hello from ${countryCode}!`, 
      currency: 'Unknown', 
      flag: '🌍', 
      color: 'bg-gray-500' 
    };
  };

  const countryContent = getCountryContent(country);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
              Vercel Regional Demo
            </h1>
            <p className="text-xl text-white/90">
              Showcasing global edge deployment capabilities
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className={`${countryContent.color} rounded-xl p-6 mb-6 text-white text-center`}>
              <div className="text-6xl mb-4">{countryContent.flag}</div>
              <h2 className="text-3xl font-bold mb-2">{countryContent.greeting}</h2>
              <p className="text-lg opacity-90">Served from the edge, closest to you!</p>
            </div>

            {/* Location Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Location</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Country:</span>
                    <span className="font-bold text-gray-800">{country}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Region:</span>
                    <span className="font-bold text-gray-800">{region}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">City:</span>
                    <span className="font-bold text-gray-800">{city}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Timezone:</span>
                    <span className="font-bold text-gray-800">{timezone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deployment Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-600">Served from:</span>
                    <span className="font-bold text-blue-800">{deploymentRegion}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-600">Currency:</span>
                    <span className="font-bold text-blue-800">{countryContent.currency}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-600">Response Time:</span>
                    <span className="font-bold text-blue-800">{new Date(timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Showcase */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Vercel Edge Features Demonstrated
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl mb-3">🌍</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Geolocation</h4>
                  <p className="text-sm text-gray-600">
                    Automatic detection of user's country, region, and city
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Edge Runtime</h4>
                  <p className="text-sm text-gray-600">
                    Ultra-fast response times from the nearest edge location
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Personalization</h4>
                  <p className="text-sm text-gray-600">
                    Content customized based on user's geographic location
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-900 text-white rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Technical Implementation</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-green-400 mb-2">Vercel Headers Used:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• x-vercel-ip-country</li>
                  <li>• x-vercel-ip-country-region</li>
                  <li>• x-vercel-ip-city</li>
                  <li>• x-vercel-ip-timezone</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Environment Variables:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• VERCEL_REGION</li>
                  <li>• Edge Runtime Detection</li>
                  <li>• Real-time Geolocation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 