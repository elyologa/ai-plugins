/**
 * Core type definitions for the AI plugin system.
 * Defines the contracts that all plugins must implement.
 */

/**
 * Supported AI provider types.
 */
export type AIProvider = 'openai' | 'anthropic' | 'google' | 'azure' | 'custom';

/**
 * Plugin capability categories.
 */
export type PluginCapability =
  | 'text-generation'
  | 'code-completion'
  | 'embedding'
  | 'image-generation'
  | 'speech-to-text'
  | 'text-to-speech'
  | 'function-calling';

/**
 * Plugin status lifecycle states.
 */
export type PluginStatus = 'unregistered' | 'registered' | 'active' | 'error' | 'disabled';

/**
 * Configuration options passed to a plugin on initialization.
 */
export interface PluginConfig {
  /** Unique identifier for this plugin instance */
  id: string;
  /** Human-readable plugin name */
  name: string;
  /** Plugin version following semver */
  version: string;
  /** The AI provider this plugin targets */
  provider: AIProvider;
  /** API key or authentication token */
  apiKey?: string;
  /** Base URL override for self-hosted or proxy endpoints */
  baseUrl?: string;
  /** Request timeout in milliseconds (defaults to 30000) */
  timeoutMs?: number;
  /** Additional provider-specific configuration */
  options?: Record<string, unknown>;
}

/**
 * Metadata describing a plugin's capabilities and requirements.
 */
export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  provider: AIProvider;
  capabilities: PluginCapability[];
  /** Minimum plugin system version required */
  minSystemVersion?: string;
}

/**
 * Context passed to plugin methods during execution.
 */
export interface PluginContext {
  /** The plugin's resolved configuration */
  config: PluginConfig;
  /** Logger scoped to this plugin */
  logger: PluginLogger;
  /** Signal to abort long-running operations */
  signal?: AbortSignal;
}

/**
 * Minimal logger interface provided to plugins.
 */
export interface PluginLogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * The primary interface every plugin must implement.
 */
export interface Plugin {
  /** Static metadata about this plugin */
  readonly metadata: PluginMetadata;
  /** Current lifecycle status */
  readonly status: PluginStatus;

  /**
   * Called once when the plugin is registered with the system.
   * Use this to validate config and set up connections.
   */
  initialize(context: PluginContext): Promise<void>;

  /**
   * Called when the plugin is being removed or the system shuts down.
   * Use this to clean up resources, close connections, etc.
   */
  destroy(): Promise<void>;

  /**
   * Returns whether this plugin is ready to handle requests.
   */
  isHealthy(): Promise<boolean>;
}

/**
 * Factory function signature for creating plugin instances.
 */
export type PluginFactory = (config: PluginConfig) => Plugin;
