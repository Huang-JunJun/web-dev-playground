"use client"

import React, { ReactNode, useEffect, useMemo, useState } from "react"
import { Breadcrumb, Layout, Menu } from "antd"

const { Sider, Content } = Layout

export type AppLayoutMenuItem = {
  key: string
  label: ReactNode
  icon?: ReactNode
  children?: AppLayoutMenuItem[]
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
  const menuPath = useMemo(
    () => findMenuPath(menuItems, selectedKey),
    [menuItems, selectedKey]
  )
  const derivedOpenKeys = useMemo(
    () => menuPath.slice(0, -1).map(item => String(item.key)),
    [menuPath]
  )
  const [openKeys, setOpenKeys] = useState<string[]>(derivedOpenKeys)

  useEffect(() => {
    setOpenKeys(derivedOpenKeys)
  }, [derivedOpenKeys])

  const handleMenuClick = (info: { key: string }) => {
    if (onMenuClick) {
      onMenuClick(info.key)
    }
  }

  const computedBreadcrumbItems = breadcrumbItems ?? [
    { title },
    ...menuPath.map(item => ({ title: item.label ?? item.key }))
  ]

  const handleOpenChange = (nextOpenKeys: string[]) => {
    if (nextOpenKeys.length <= 1) {
      setOpenKeys(nextOpenKeys)
      return
    }
    setOpenKeys([nextOpenKeys[nextOpenKeys.length - 1]])
  }

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
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
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

const findMenuPath = (
  items: AppLayoutMenuItem[],
  targetKey?: string
): AppLayoutMenuItem[] => {
  if (!targetKey) return []

  for (const item of items) {
    if (item.key === targetKey) {
      return [item]
    }

    if (item.children?.length) {
      const childPath = findMenuPath(item.children, targetKey)
      if (childPath.length) {
        return [item, ...childPath]
      }
    }
  }

  return []
}
