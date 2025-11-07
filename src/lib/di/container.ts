import awilix, { type AwilixContainer, createContainer } from "awilix";
import { config } from "dotenv";

config();

/**
 * Shared application container
 * Use this container to register all application dependencies
 */
export const container = createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

/**
 * Get a dependency from the container
 * @param name - The name of the dependency to resolve
 */
export function resolve<T = unknown>(name: string): T {
  return container.resolve<T>(name);
}

/**
 * Check if a dependency is registered
 * @param name - The name of the dependency to check
 */
export function isRegistered(name: string): boolean {
  return container.hasRegistration(name);
}

/**
 * Initialize the container
 * Call this once at application startup
 */
export function initializeContainer(): AwilixContainer {
  console.log("🔧 Initializing dependency injection container");
  return container;
}
