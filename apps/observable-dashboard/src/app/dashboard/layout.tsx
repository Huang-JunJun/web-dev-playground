"use client"

import React from "react"
import { AppLayout, AppLayoutMenuItem } from "@/components/layout/AppLayout"
import { useRouter, usePathname } from "next/navigation"
import { PieChartOutlined } from "@ant-design/icons"

const menuItems: AppLayoutMenuItem[] = [
  { key: "/dashboard", label: "总览", icon: <PieChartOutlined /> },
  { key: "/dashboard/logs", label: "日志列表" },
  { key: "/dashboard/settings", label: "设置" }
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = (key: string) => {
    router.push(key)
  }

  return (
    <AppLayout
      title="DeepTrace Dashboard"
      menuItems={menuItems}
      selectedKey={pathname}
      onMenuClick={handleMenuClick}
    >
      {children}
    </AppLayout>
  )
}

export default DashboardLayout