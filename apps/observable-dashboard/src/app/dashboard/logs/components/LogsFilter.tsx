"use client"

import React, { memo } from "react"
import { Input, Select, Space, Switch, Typography } from "antd"
import type { LogLevel } from "../types"

const { Text } = Typography

type LevelFilterValue = LogLevel | "ALL"

type LogsFilterProps = {
  loading?: boolean
  searchText: string
  levelFilter: LevelFilterValue
  onlyErrors: boolean
  onSearchTextChange: (value: string) => void
  onLevelFilterChange: (value: LevelFilterValue) => void
  onOnlyErrorsChange: (value: boolean) => void
}

export const LogsFilter = memo(function LogsFilter({
  loading = false,
  searchText,
  levelFilter,
  onlyErrors,
  onSearchTextChange,
  onLevelFilterChange,
  onOnlyErrorsChange
}: LogsFilterProps) {
  return (
    <Space className="flex flex-wrap justify-between gap-3">
      <Input
        allowClear
        disabled={loading}
        placeholder="按服务名或消息搜索"
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
        style={{ maxWidth: 260 }}
      />

      <Space className="flex flex-wrap gap-3">
        <Space>
          <Text type="secondary">等级</Text>
          <Select<LevelFilterValue>
            disabled={loading}
            value={levelFilter}
            style={{ width: 140 }}
            onChange={value => onLevelFilterChange(value)}
            options={[
              { value: "ALL", label: "全部" },
              { value: "INFO", label: "INFO" },
              { value: "WARN", label: "WARN" },
              { value: "ERROR", label: "ERROR" }
            ]}
          />
        </Space>

        <Space>
          <Text type="secondary">只看报错</Text>
          <Switch
            disabled={loading}
            checked={onlyErrors}
            onChange={checked => onOnlyErrorsChange(checked)}
          />
        </Space>
      </Space>
    </Space>
  )
})

