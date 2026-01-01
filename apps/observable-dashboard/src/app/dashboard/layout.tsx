"use client"

import React from "react"
import { AppLayout, AppLayoutMenuItem } from "@/components/layout/AppLayout"
import { useRouter, usePathname } from "next/navigation"
import { PieChartOutlined, FileTextOutlined, SettingOutlined } from "@ant-design/icons"

const menuItems: AppLayoutMenuItem[] = [
  {
    key: "overview",
    label: "概览",
    icon: <PieChartOutlined />,
    children: [{ key: "/dashboard", label: "总览" }]
  },
  {
    key: "logs",
    label: "日志",
    icon: <FileTextOutlined />,
    children: [{ key: "/dashboard/logs", label: "日志列表" }]
  },
  {
    key: "system",
    label: "系统",
    icon: <SettingOutlined />,
    children: [{ key: "/dashboard/settings", label: "设置" }]
  }
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  const breadcrumbLabelMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/logs": "Logs",
    "/dashboard/settings": "Settings"
  }

  const handleMenuClick = (key: string) => {
    router.push(key)
  }

  return (
    <AppLayout
      title="DeepTrace Dashboard"
      menuItems={menuItems}
      selectedKey={pathname}
      onMenuClick={handleMenuClick}
      breadcrumbItems={[
        { title: "DeepTrace" },
        { title: breadcrumbLabelMap[pathname] ?? "Dashboard" }
      ]}
    >
      {children}
    </AppLayout>
  )
}

export default DashboardLayout
