/**
 * ai-plugins - Fork of bitwarden/ai-plugins
 *
 * Main entry point for the AI Plugins package.
 * Exports all public APIs for plugin registration, execution, and management.
 */

export * from "./plugins/registry";
export * from "./plugins/types";
export * from "./plugins/executor";

import { PluginRegistry } from "./plugins/registry";
import { PluginExecutor } from "./plugins/executor";

/**
 * Creates and returns a configured plugin registry instance.
 * This is the primary way to interact with the ai-plugins system.
 *
 * @example
 * ```ts
 * import { createPluginSystem } from 'ai-plugins';
 *
 * const { registry, executor } = createPluginSystem();
 * registry.register(myPlugin);
 * const result = await executor.run('my-plugin', { input: 'hello' });
 * ```
 */
export function createPluginSystem(): {
  registry: PluginRegistry;
  executor: PluginExecutor;
} {
  const registry = new PluginRegistry();
  const executor = new PluginExecutor(registry);

  return { registry, executor };
}

/** Package version — kept in sync with package.json */
export const VERSION = "0.1.0";
