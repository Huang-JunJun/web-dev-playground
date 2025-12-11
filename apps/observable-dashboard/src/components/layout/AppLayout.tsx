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
    <Layout style={{ height: '100vh'}} className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={220}
        className="bg-[#020617]"
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
      <Layout className="bg-white min-h-screen">
        <Content  className="p-6 bg-white h-full">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
