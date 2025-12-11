"use client"

import { useMemo, useState } from "react"
import { Table, Input, Select, Space, Typography, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"

const { Title, Text } = Typography

type LogLevel = "INFO" | "WARN" | "ERROR"

type LogItem = {
  id: string
  timestamp: string
  level: LogLevel
  service: string
  message: string
  traceId: string
}

const logLevelColor: Record<LogLevel, string> = {
  INFO: "blue",
  WARN: "gold",
  ERROR: "red"
}

const mockLogs: LogItem[] = [
  {
    id: "1",
    timestamp: "2025-01-01 10:00:01",
    level: "INFO",
    service: "auth-service",
    message: "用户登录成功",
    traceId: "trace-10001"
  },
  {
    id: "2",
    timestamp: "2025-01-01 10:01:12",
    level: "WARN",
    service: "order-service",
    message: "订单创建耗时接近阈值",
    traceId: "trace-10002"
  },
  {
    id: "3",
    timestamp: "2025-01-01 10:02:45",
    level: "ERROR",
    service: "payment-service",
    message: "支付回调签名校验失败",
    traceId: "trace-10003"
  },
  {
    id: "4",
    timestamp: "2025-01-01 10:03:30",
    level: "INFO",
    service: "gateway",
    message: "心跳检查通过",
    traceId: "trace-10004"
  },
  {
    id: "5",
    timestamp: "2025-01-01 10:05:09",
    level: "WARN",
    service: "auth-service",
    message: "多次密码错误触发风险控制",
    traceId: "trace-10005"
  },
  {
    id: "6",
    timestamp: "2025-01-01 10:06:21",
    level: "ERROR",
    service: "log-ingestor",
    message: "Kafka 消费延迟超过阈值",
    traceId: "trace-10006"
  },
  {
    id: "7",
    timestamp: "2025-01-01 10:08:17",
    level: "INFO",
    service: "metrics-service",
    message: "定时上报指标成功",
    traceId: "trace-10007"
  },
  {
    id: "8",
    timestamp: "2025-01-01 10:09:52",
    level: "WARN",
    service: "order-service",
    message: "库存扣减重试次数过多",
    traceId: "trace-10008"
  },
  {
    id: "9",
    timestamp: "2025-01-01 10:11:00",
    level: "ERROR",
    service: "notification-service",
    message: "短信服务提供商返回错误码",
    traceId: "trace-10009"
  },
  {
    id: "10",
    timestamp: "2025-01-01 10:12:33",
    level: "INFO",
    service: "gateway",
    message: "路由配置热更新完成",
    traceId: "trace-10010"
  }
]

const columns: ColumnsType<LogItem> = [
  {
    title: "时间",
    dataIndex: "timestamp",
    key: "timestamp",
    width: 180
  },
  {
    title: "等级",
    dataIndex: "level",
    key: "level",
    width: 100,
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
]

const LogsPage = () => {
  const [searchText, setSearchText] = useState("")
  const [levelFilter, setLevelFilter] = useState<LogLevel | "ALL">("ALL")

  const filteredLogs = useMemo(() => {
    const text = searchText.trim().toLowerCase()
    return mockLogs.filter(item => {
      const matchLevel = levelFilter === "ALL" || item.level === levelFilter
      const matchText =
        !text ||
        item.service.toLowerCase().includes(text) ||
        item.message.toLowerCase().includes(text)
      return matchLevel && matchText
    })
  }, [searchText, levelFilter])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Title level={3} className="!mb-1">
          日志列表
        </Title>
        <Text type="secondary">
          查看系统日志，并通过等级与关键词进行简单筛选
        </Text>
      </div>

      <Space className="flex flex-wrap justify-between gap-3">
        <Input
          allowClear
          placeholder="按服务名或消息搜索"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ maxWidth: 260 }}
        />
        <Space>
          <Text type="secondary">等级</Text>
          <Select
            value={levelFilter}
            style={{ width: 140 }}
            onChange={value => setLevelFilter(value)}
            options={[
              { value: "ALL", label: "全部" },
              { value: "INFO", label: "INFO" },
              { value: "WARN", label: "WARN" },
              { value: "ERROR", label: "ERROR" }
            ]}
          />
        </Space>
      </Space>

      <Table<LogItem>
        rowKey="id"
        columns={columns}
        dataSource={filteredLogs}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}

export default LogsPage