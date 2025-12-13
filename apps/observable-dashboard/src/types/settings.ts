export type DefaultLogLevel = "ALL" | "INFO" | "WARN" | "ERROR"

export type SettingsFormValues = {
  nickname: string
  defaultLogLevel: DefaultLogLevel
  enableAlert: boolean
  email?: string
}

