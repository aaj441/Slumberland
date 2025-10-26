import { getRouter } from "../router";

export const route = getRouter().createRoute({
  getParentRoute: () => import("./__root").route,
  path: "/health",
  component: HealthComponent,
});

function HealthComponent() {
  return Response.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "melatonin",
    version: "1.0.0",
    environment: import.meta.env.MODE,
  });
}

