"use client"

import React, { memo, useMemo } from "react"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import {
  logLevelColor,
  logLevelOrder,
  parseLogTimestamp,
  type LogItem,
  type LogLevel
} from "../types"

type LogsTableProps = {
  loading?: boolean
  logs: LogItem[]
  emptyText?: React.ReactNode
}

export const LogsTable = memo(function LogsTable({
  loading = false,
  logs,
  emptyText
}: LogsTableProps) {
  const columns = useMemo<ColumnsType<LogItem>>(
    () => [
      {
        title: "时间",
        dataIndex: "timestamp",
        key: "timestamp",
        width: 180,
        defaultSortOrder: "descend",
        sorter: (a, b) =>
          parseLogTimestamp(a.timestamp) - parseLogTimestamp(b.timestamp)
      },
      {
        title: "等级",
        dataIndex: "level",
        key: "level",
        width: 100,
        sorter: (a, b) => logLevelOrder[a.level] - logLevelOrder[b.level],
        sortDirections: ["descend", "ascend"],
        render: level => {
          const value = level as LogLevel
          return <Tag color={logLevelColor[value]}>{value}</Tag>
        }
      },
      {
        title: "服务名",
        dataIndex: "service",
        key: "service",
        width: 160
      },
      {
        title: "消息",
        dataIndex: "message",
        key: "message"
      },
      {
        title: "Trace ID",
        dataIndex: "traceId",
        key: "traceId",
        width: 180
      }
    ],
    []
  )

  return (
    <Table<LogItem>
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={logs}
      pagination={{ pageSize: 10 }}
      locale={emptyText ? { emptyText } : undefined}
    />
  )
})
