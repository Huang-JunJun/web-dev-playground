"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Alert, Button, Card, Descriptions, Empty, Tag, Typography } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { loadSettingsFromStorage } from "@/lib/settingsStorage"
import { fakeFetchLogs } from "./fakeFetchLogs"
import { LogsFilter } from "./components/LogsFilter"
import { LogsTable } from "./components/LogsTable"
import type { LogItem, LogLevel } from "./types"
import type { SettingsFormValues } from "@/types/settings"

const { Title, Text } = Typography

const LogsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [logs, setLogs] = useState<LogItem[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [settings, setSettings] = useState<SettingsFormValues | null>(null)

  const [searchText, setSearchText] = useState("")
  const [levelFilter, setLevelFilter] = useState<LogLevel | "ALL">("ALL")
  const [onlyErrors, setOnlyErrors] = useState(false)

  const shouldFail = searchParams.get("fail") === "1"
  const shouldEmpty = searchParams.get("empty") === "1"

  useEffect(() => {
    const saved = loadSettingsFromStorage()
    if (!saved) return
    setSettings(saved)
    setLevelFilter(saved.defaultLogLevel)
  }, [])

  const loadLogs = useCallback(async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const data = await fakeFetchLogs({ shouldFail, shouldEmpty })
      setLogs(data)
    } catch (error) {
      setLogs([])
      setErrorMessage(
        error instanceof Error ? error.message : "日志加载失败，请稍后重试"
      )
    } finally {
      setLoading(false)
    }
  }, [shouldEmpty, shouldFail])

  useEffect(() => {
    void loadLogs()
  }, [loadLogs])

  const handleSearchTextChange = useCallback((value: string) => {
    setSearchText(value)
  }, [])

  const handleLevelFilterChange = useCallback((value: LogLevel | "ALL") => {
    setLevelFilter(value)
  }, [])

  const handleOnlyErrorsChange = useCallback((value: boolean) => {
    setOnlyErrors(value)
  }, [])

  const filteredLogs = useMemo(() => {
    const text = searchText.trim().toLowerCase()
    return logs.filter(item => {
      const matchLevel = levelFilter === "ALL" || item.level === levelFilter
      const matchOnlyErrors = !onlyErrors || item.level === "ERROR"
      const matchText =
        !text ||
        item.service.toLowerCase().includes(text) ||
        item.message.toLowerCase().includes(text)
      return matchLevel && matchOnlyErrors && matchText
    })
  }, [logs, searchText, levelFilter, onlyErrors])

  const emptyText = useMemo(() => {
    if (logs.length > 0 && filteredLogs.length === 0) return "无匹配结果"
    return "暂无日志数据"
  }, [filteredLogs.length, logs.length])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Title level={3} className="!mb-1">
          日志列表
        </Title>
        <Text type="secondary">
          查看系统日志：支持排序 + 组合筛选，并演练 loading / empty / error 状态
        </Text>
      </div>

      {settings && (
        <Card size="small" className="shadow-sm">
          <Descriptions
            size="small"
            column={{ xs: 1, sm: 2, md: 3 }}
            items={[
              { key: "nickname", label: "昵称", children: settings.nickname },
              {
                key: "defaultLogLevel",
                label: "默认日志级别",
                children: <Tag>{settings.defaultLogLevel}</Tag>
              },
              {
                key: "enableAlert",
                label: "告警通知",
                children: settings.enableAlert ? "开启" : "关闭"
              },
              { key: "email", label: "通知邮箱", children: settings.email || "-" }
            ]}
          />
          <div className="mt-2 flex justify-end">
            <Button size="small" onClick={() => router.push("/dashboard/settings")}>
              去修改设置
            </Button>
          </div>
        </Card>
      )}

      {errorMessage && (
        <Alert
          showIcon
          type="error"
          message="日志加载失败"
          description={errorMessage}
          action={
            <Button size="small" onClick={loadLogs}>
              重试
            </Button>
          }
        />
      )}

      {!errorMessage && !loading && logs.length === 0 && (
        <Empty
          description="暂无日志数据"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button onClick={loadLogs}>重新加载</Button>
        </Empty>
      )}

      <LogsFilter
        loading={loading}
        searchText={searchText}
        levelFilter={levelFilter}
        onlyErrors={onlyErrors}
        onSearchTextChange={handleSearchTextChange}
        onLevelFilterChange={handleLevelFilterChange}
        onOnlyErrorsChange={handleOnlyErrorsChange}
      />

      <LogsTable loading={loading} logs={filteredLogs} emptyText={emptyText} />
    </div>
  )
}

export default LogsPage
