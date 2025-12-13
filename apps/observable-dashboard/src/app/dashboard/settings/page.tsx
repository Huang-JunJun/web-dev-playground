"use client"

import { useEffect } from "react"
import { Button, Card, Form, Input, Select, Space, Switch, Typography, message } from "antd"
import { loadSettingsFromStorage, saveSettingsToStorage } from "@/lib/settingsStorage"
import type { SettingsFormValues } from "@/types/settings"

const { Title, Text } = Typography

const defaultValues: SettingsFormValues = {
  nickname: "Jun",
  defaultLogLevel: "ALL",
  enableAlert: true,
  email: ""
}

const SettingsPage = () => {
  const [form] = Form.useForm<SettingsFormValues>()

  useEffect(() => {
    const saved = loadSettingsFromStorage()
    if (!saved) return
    form.setFieldsValue({ ...defaultValues, ...saved })
  }, [form])

  const handleFinish = (values: SettingsFormValues) => {
    saveSettingsToStorage(values)
    message.success("设置已保存")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-sm">
        <div className="mb-6">
          <Title level={3} className="!mb-1">
            设置
          </Title>
          <Text type="secondary">配置个人偏好与通知选项</Text>
        </div>

        <Form<SettingsFormValues>
          layout="vertical"
          form={form}
          initialValues={defaultValues}
          onFinish={handleFinish}
        >
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              {
                required: true,
                message: "请输入昵称"
              }
            ]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item
            label="默认日志级别"
            name="defaultLogLevel"
            rules={[
              {
                required: true,
                message: "请选择默认日志级别"
              }
            ]}
          >
            <Select
              options={[
                { value: "ALL", label: "全部" },
                { value: "INFO", label: "INFO" },
                { value: "WARN", label: "WARN" },
                { value: "ERROR", label: "ERROR" }
              ]}
            />
          </Form.Item>

          <Form.Item
            label="告警通知"
            name="enableAlert"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="通知邮箱"
            name="email"
            rules={[
              {
                type: "email",
                message: "请输入有效的邮箱地址"
              }
            ]}
          >
            <Input placeholder="用于接收告警通知（可选）" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  form.resetFields()
                }}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SettingsPage
