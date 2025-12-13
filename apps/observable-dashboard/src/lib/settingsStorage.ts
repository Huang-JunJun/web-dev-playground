import type { SettingsFormValues } from "@/types/settings"

const SETTINGS_STORAGE_KEY = "deeptrace.settings.v1"

const isSettingsFormValues = (value: unknown): value is SettingsFormValues => {
  if (!value || typeof value !== "object") return false
  const record = value as Record<string, unknown>

  const nicknameOk = typeof record.nickname === "string"
  const enableAlertOk = typeof record.enableAlert === "boolean"
  const emailOk =
    record.email === undefined || typeof record.email === "string"
  const defaultLogLevelOk =
    record.defaultLogLevel === "ALL" ||
    record.defaultLogLevel === "INFO" ||
    record.defaultLogLevel === "WARN" ||
    record.defaultLogLevel === "ERROR"

  return nicknameOk && enableAlertOk && emailOk && defaultLogLevelOk
}

export const loadSettingsFromStorage = () => {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isSettingsFormValues(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const saveSettingsToStorage = (values: SettingsFormValues) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(values))
}

