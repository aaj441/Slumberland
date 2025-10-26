import { z } from "zod";

export function createHealthCheck() {
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "melatonin",
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "unknown",
  };
}

export function createHealthCheckSchema() {
  return z.object({
    status: z.string(),
    timestamp: z.string(),
    service: z.string(),
    version: z.string(),
    environment: z.string(),
  });
}

