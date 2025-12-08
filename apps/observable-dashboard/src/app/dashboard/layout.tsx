"use client"

import React from "react"
import { AppLayout, AppLayoutMenuItem } from "@/components/layout/AppLayout"
import { useRouter, usePathname } from "next/navigation"
import { PieChartOutlined } from "@ant-design/icons"

const menuItems: AppLayoutMenuItem[] = [
  { key: "/dashboard", label: "概览", icon: <PieChartOutlined /> },
  { key: "/dashboard/logs", label: "日志列表" },
  { key: "/dashboard/errors", label: "错误分析" }
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = (key: string) => {
    router.push(key)
  }

  return (
    <AppLayout
      title="Observable Dashboard"
      menuItems={menuItems}
      selectedKey={pathname}
      onMenuClick={handleMenuClick}
      headerRight={<div>这里放用户信息 / 主题切换等</div>}
    >
      {children}
    </AppLayout>
  )
}

export default DashboardLayout