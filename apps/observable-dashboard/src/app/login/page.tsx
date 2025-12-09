"use client"

import { Card, Form, Input, Button, Typography } from "antd"

const { Title, Text } = Typography

const LoginPage = () => {
  const [form] = Form.useForm()

  const handleFinish = (values: { username: string; password: string }) => {
    console.log("login submit", values)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <div className="mb-6 text-center">
            <Title level={3} className="!mb-1">
              登录 DeepTrace
            </Title>
            <Text type="secondary">输入账号和密码进入系统</Text>
          </div>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                { required: true, message: "请输入用户名" }
              ]}
            >
              <Input placeholder="请输入用户名" autoComplete="username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: "请输入密码" }
              ]}
            >
              <Input.Password placeholder="请输入密码" autoComplete="current-password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
