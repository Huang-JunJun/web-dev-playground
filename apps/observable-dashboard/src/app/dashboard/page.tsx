"use client"

import { Card, Col, Row, Typography } from "antd"

const { Title, Text } = Typography

const stats = [
  { title: "今日访问量", value: 12345 },
  { title: "错误数", value: 23 },
  { title: "告警数", value: 5 },
  { title: "平均响应时间 (ms)", value: 186 }
]

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <Title level={3} className="!mb-1">
            总览
          </Title>
          <Text type="secondary">
            展示系统运行情况和关键指标，后续会接入真实监控数据
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          {stats.map(item => (
            <Col key={item.title} xs={12} md={6}>
              <Card>
                <div className="flex flex-col gap-2">
                  <Text type="secondary">{item.title}</Text>
                  <Title level={4} className="!mb-0">
                    {item.value}
                  </Title>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="错误趋势（占位）">
              <div className="flex h-64 items-center justify-center text-slate-400">
                图表区域（后续接入可视化组件）
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="最近告警（占位）">
              <div className="flex h-64 items-center justify-center text-slate-400">
                告警列表区域（后续接入接口）
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DashboardPage
