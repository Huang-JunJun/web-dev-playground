# web-dev-playground

一个用于前端工程实践与技术沉淀的代码仓库，集中存放项目代码、学习笔记与后续的算法练习，目标是长期可维护、可扩展、可展示。

## 仓库定位

- 主项目：基于 Next.js + React + TypeScript 的可观测 / 日志分析后台（Observable Dashboard）
- 支线能力：
  - 多端适配：以 PC 后台为主，逐步完善移动端友好布局
  - 工程化与性能优化：CI/CD、测试覆盖、SSR/SSG、性能调优
- 辅助模块：
  - 学习笔记（浏览器原理、TypeScript 进阶、框架与工程化实践）
  - 算法与数据结构练习（TypeScript 实现）

## 技术栈规划

- 框架与语言
  - Next.js（App Router）
  - React 18
  - TypeScript
- UI 与样式
  - Ant Design（中后台组件库）
  - Tailwind CSS（布局与细节样式）
- 工程化与其他
  - ESLint / Prettier
  - 单元测试与 E2E 测试（后续补充）
  - GitHub Actions（后续接入 CI/CD）

## 目录结构（当前）

```text
web-dev-playground/
  apps/
    observable-dashboard/        # 主项目：可观测 / 日志分析后台
      src/
        app/
          page.tsx               # 根路由：当前重定向到 /dashboard
          dashboard/             # 后台主入口及子页面
            layout.tsx           # 使用 AppLayout 封装的 AntD 后台壳
            page.tsx             # 仪表盘首页
        components/
          layout/
            AppLayout.tsx        # 通用后台布局组件（侧边栏 + 顶部导航 + 内容区）
      public/
      ...
  docs/
    notes/
      js-event-loop.md           # 事件循环与宏 / 微任务学习笔记
  packages/
    algorithms/                  # 算法题与解法（后续补充）
```

## 三个月内的整体规划（概要）

- 阶段一：基础与项目启动（第 1–4 周）
  - 强化 JavaScript / TypeScript / 浏览器原理相关知识
  - 搭建 Observable Dashboard 的基础架构与路由
  - 建立学习笔记与算法模块，形成稳定的日常提交节奏
- 阶段二：框架原理、工程化与多端适配（第 5–8 周）
  - 深入 React / Next.js 原理与 SSR 实战
  - 引入测试、CI/CD、权限系统与性能优化
  - 为后台补充移动端友好布局或轻量版访问入口
- 阶段三：系统设计与项目打磨（第 9–12 周）
  - 完善监控 / 可观测能力与数据展示模块
  - 梳理整体架构与技术方案文档
  - 输出多篇实战文章与项目总结，便于对外展示与复盘

## 学习进度日志

### Day 1（可观测后台项目初始化）

- 建立 `web-dev-playground` 仓库，确定 monorepo 结构：
  - `apps/observable-dashboard` 作为主项目
  - `docs/notes` 用于存放学习笔记
  - `packages/algorithms` 预留算法练习模块
- 使用 `create-next-app` 初始化 `observable-dashboard`：
  - 启用 TypeScript 与 App Router
  - 将源码放置在 `src` 目录下
- 设计并实现通用后台布局组件 `AppLayout`：
  - 基于 Ant Design `Layout` + `Menu` + `Typography`
  - 支持可折叠侧边栏、顶部导航与内容区卡片化展示
- 为 `/dashboard` 路由接入 `AppLayout`，作为仪表盘入口：
  - `/` 根路由通过 `app/page.tsx` 重定向到 `/dashboard`
- 编写事件循环学习笔记 `docs/notes/js-event-loop.md`：
  - 梳理调用栈、宏任务、微任务的调度顺序
  - 通过经典示例说明 `start → end → promise → timeout` 的执行流程

后续每天会在此区域追加新的 Day X 记录，用于追踪项目与学习进展。