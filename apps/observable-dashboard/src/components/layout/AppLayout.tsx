"use client"

import React, { ReactNode, useState } from "react"
import { Layout, Menu } from "antd"

const { Header, Sider, Content } = Layout

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
  title = "DeepTrace",
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
    <Layout className="min-h-screen bg-[#020617]">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
      >
        <div className="flex items-center justify-center h-16 text-white text-lg font-semibold bg-[#020617]">
          {collapsed ? "DT" : "DeepTrace"}
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
        <Content className="p-4 bg-[#020617]">
          <div className="h-full rounded-lg bg-[#020617] p-0">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
