"use client"

import React, { ReactNode, useState } from "react"
import { Layout, Menu, Typography } from "antd"

const { Header, Sider, Content } = Layout
const { Title } = Typography

export type AppLayoutMenuItem = {
  key: string
  label: ReactNode
  icon?: ReactNode
}

type AppLayoutProps = {
  title?: string
  menuItems?: AppLayoutMenuItem[]
  selectedKey?: string
  onMenuClick?: (key: string) => void
  headerRight?: ReactNode
  children: ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title = "Observable Dashboard",
  menuItems = [],
  selectedKey,
  onMenuClick,
  headerRight,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleMenuClick = (info: { key: string }) => {
    if (onMenuClick) {
      onMenuClick(info.key)
    }
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
      >
        <div className="flex items-center justify-center h-16 text-white text-lg font-semibold">
          {collapsed ? "OD" : "Observable"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between px-6 bg-white shadow-sm">
          <Title level={4} className="!mb-0">
            {title}
          </Title>
          <div className="flex items-center gap-4">
            {headerRight}
          </div>
        </Header>
        <Content className="p-6 bg-slate-50">
          <div className="h-full bg-white rounded-md shadow-sm p-6">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
