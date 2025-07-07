import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("regional-demo", "routes/regional-demo.tsx"),
  route("api/skew-test", "routes/api.skew-test.tsx"),
] satisfies RouteConfig;
