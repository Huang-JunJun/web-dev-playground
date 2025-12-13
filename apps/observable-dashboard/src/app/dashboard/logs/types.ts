export type LogLevel = "INFO" | "WARN" | "ERROR"

export type LogItem = {
  id: string
  timestamp: string
  level: LogLevel
  service: string
  message: string
  traceId: string
}

export const logLevelColor: Record<LogLevel, string> = {
  INFO: "blue",
  WARN: "gold",
  ERROR: "red"
}

export const logLevelOrder: Record<LogLevel, number> = {
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

export const parseLogTimestamp = (timestamp: string) =>
  new Date(timestamp.replace(" ", "T")).getTime()

