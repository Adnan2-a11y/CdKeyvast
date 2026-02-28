/**
 * Server-side logger for debugging API calls and data flow.
 *
 * - Shows coloured tags in the terminal
 * - Respects LOG_LEVEL env var (debug | info | warn | error)
 * - NEVER sends data to the client
 */

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const COLOURS: Record<LogLevel, string> = {
  debug: "\x1b[36m", // cyan
  info: "\x1b[32m",  // green
  warn: "\x1b[33m",  // yellow
  error: "\x1b[31m", // red
};

const RESET = "\x1b[0m";

function getMinLevel(): number {
  const env = (process.env.LOG_LEVEL || "debug").toLowerCase() as LogLevel;
  return LEVELS[env] ?? 0;
}

function formatMessage(level: LogLevel, tag: string, message: string, meta?: unknown): string {
  const timestamp = new Date().toISOString();
  const colour = COLOURS[level];
  const metaStr = meta !== undefined ? ` ${JSON.stringify(meta, null, 0)}` : "";
  return `${colour}[${level.toUpperCase()}]${RESET} ${timestamp} [${tag}] ${message}${metaStr}`;
}

function shouldLog(level: LogLevel): boolean {
  return LEVELS[level] >= getMinLevel();
}

export const logger = {
  debug(tag: string, message: string, meta?: unknown) {
    if (shouldLog("debug")) console.debug(formatMessage("debug", tag, message, meta));
  },
  info(tag: string, message: string, meta?: unknown) {
    if (shouldLog("info")) console.info(formatMessage("info", tag, message, meta));
  },
  warn(tag: string, message: string, meta?: unknown) {
    if (shouldLog("warn")) console.warn(formatMessage("warn", tag, message, meta));
  },
  error(tag: string, message: string, meta?: unknown) {
    if (shouldLog("error")) console.error(formatMessage("error", tag, message, meta));
  },
};
