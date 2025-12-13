"use client"

import React, { ReactNode, useState } from "react"
import { Breadcrumb, Layout, Menu } from "antd"

const { Sider, Content } = Layout

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
  breadcrumbItems?: { title: ReactNode }[]
  children: ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title = "DeepTrace",
  menuItems = [],
  selectedKey,
  onMenuClick,
  headerRight,
  breadcrumbItems,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleMenuClick = (info: { key: string }) => {
    if (onMenuClick) {
      onMenuClick(info.key)
    }
  }

  const currentMenuItem = menuItems.find(item => item.key === selectedKey)
  const computedBreadcrumbItems = breadcrumbItems ?? [
    { title },
    ...(currentMenuItem
      ? [{ title: currentMenuItem.label }]
      : selectedKey
        ? [{ title: selectedKey }]
        : [])
  ]

  return (
    <Layout style={{ height: "100vh" }} className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        onBreakpoint={broken => {
          if (broken) setCollapsed(true)
        }}
        collapsedWidth={72}
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
        <Content className={`bg-white h-full ${collapsed ? "p-4" : "p-6"}`}>
          <div className="mb-4 flex items-center justify-between">
            <Breadcrumb items={computedBreadcrumbItems} />
            {headerRight}
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
