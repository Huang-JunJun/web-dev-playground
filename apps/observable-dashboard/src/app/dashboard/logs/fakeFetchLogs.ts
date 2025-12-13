import type { LogItem } from "./types"

type FakeFetchLogsOptions = {
  delayMs?: number
  shouldFail?: boolean
  shouldEmpty?: boolean
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

export const fakeFetchLogs = (options: FakeFetchLogsOptions = {}) => {
  const { delayMs = 600, shouldFail = false, shouldEmpty = false } = options

  return new Promise<LogItem[]>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("模拟请求失败：请稍后重试"))
        return
      }

      if (shouldEmpty) {
        resolve([])
        return
      }

      resolve([...mockLogs])
    }, delayMs)
  })
}

