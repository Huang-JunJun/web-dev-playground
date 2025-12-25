# DeepTrace · web-dev-playground

> 一个面向前端工程实践与技术沉淀的代码仓库，用于集中存放项目代码、学习笔记与后续的算法练习，目标是：可维护、可扩展、可展示。

---

## 一、项目简介

本仓库采用 monorepo 结构，围绕一个中后台项目 **DeepTrace** 展开，用来练习与沉淀：

- 可观测 / 日志分析后台的页面与交互
- 多端适配、工程化与性能优化
- 日常学习笔记与算法题解

可以作为个人技术练习项目、演示项目，以及后续文章的代码配套仓库。

---

## 二、功能模块

- **主项目：DeepTrace Dashboard**
  - 基于 Next.js + React + TypeScript
  - 模拟可观测 / 日志分析后台：仪表盘、错误趋势、告警列表等
  - 规划支持：权限体系、可视化图表、性能与体验优化

- **学习笔记**
  - 记录 JavaScript / TypeScript / 浏览器原理
  - 框架原理、工程化实践、性能优化等主题
  - 后续可直接用于整理为博客或文章

- **算法与数据结构练习**
  - 使用 TypeScript 实现常见题目与基础数据结构
  - 统一放在 packages 中，便于后续扩展与测试

---

## 三、技术栈规划

### 1. 框架与语言

- Next.js（App Router）
- React 18
- TypeScript

### 2. UI 与样式

- Ant Design（中后台组件库）
- Tailwind CSS（布局与细节样式）

### 3. 工程化与其他

- ESLint / Prettier（代码规范）
- 单元测试与 E2E 测试（后续补充）
- GitHub Actions（后续接入 CI/CD 流程）

---

## 四、目录结构（当前）

```text
web-dev-playground/
  apps/
    observable-dashboard/        # 主项目：DeepTrace 可观测 / 日志分析后台
      src/
        app/
          page.tsx               # 根路由：当前重定向到 /dashboard
          dashboard/             # 后台主入口及子页面
            layout.tsx           # 使用 AppLayout 封装的 AntD 布局壳
            page.tsx             # 仪表盘首页
        components/
          layout/
            AppLayout.tsx        # 通用后台布局组件（侧边栏 + 内容区）
      public/
      ...
  docs/
    notes/
      js-event-loop.md           # 事件循环与宏 / 微任务学习笔记
  packages/
    algorithms/                  # 算法题与解法（预留模块）
```

后续随着项目演进，会在此结构上逐步补充更多 apps / packages。

---

## 五、三个月内的整体规划（概要）

- **阶段一：基础与项目启动（第 1–4 周）**
  - 强化 JavaScript / TypeScript / 浏览器原理相关知识
  - 搭建 DeepTrace 的基础架构与路由（Dashboard、登录等）
  - 建立学习笔记与算法模块，形成稳定的日常提交节奏

- **阶段二：框架原理、工程化与多端适配（第 5–8 周）**
  - 深入 React / Next.js 原理与 SSR 实战
  - 引入测试、CI/CD、权限系统与性能优化
  - 为后台补充移动端友好布局或轻量版访问入口

- **阶段三：系统设计与项目打磨（第 9–12 周）**
  - 完善监控 / 可观测能力与数据展示模块
  - 梳理整体架构与技术方案文档
  - 输出多篇实战文章与项目总结，便于对外展示与复盘

---

## 六、学习进度日志

- 建立 `web-dev-playground` 仓库，确定 monorepo 结构：
  - `apps/observable-dashboard` 作为主项目（DeepTrace）
  - `docs/notes` 用于存放学习笔记
  - `packages/algorithms` 预留算法练习模块
- 使用 `create-next-app` 初始化 `observable-dashboard`：
  - 启用 TypeScript 与 App Router
  - 将源码放置在 `src` 目录下
- 设计并实现通用后台布局组件 `AppLayout`：
  - 基于 Ant Design `Layout` + `Menu`
  - 支持可折叠侧边栏与内容区布局，方便承载各类页面
- 为 `/dashboard` 路由接入 `AppLayout`，作为仪表盘入口：
  - `/` 根路由通过 `app/page.tsx` 重定向到 `/dashboard`
- 编写事件循环学习笔记 `docs/notes/js-event-loop.md`：
  - 梳理调用栈、宏任务、微任务的调度顺序
  - 通过经典示例说明 `start → end → promise → timeout` 的执行流程

> 后续每天会在此区域追加新的 Day X 记录，用于追踪项目与学习进展。

# 防抖（debounce）与节流（throttle）

## 1. 防抖

- 定义：高频触发时，只在“停止触发一段时间后”执行一次。
- 常见场景：
  - 输入框搜索、联想
  - resize 结束时重新布局
- 核心实现：每次触发都重置定时器。

## 2. 节流

- 定义：高频触发时，按固定时间间隔执行，限速。
- 常见场景：
  - scroll 监听（上报曝光、懒加载）
  - mousemove 拖拽
- 核心实现：记录上次执行时间 / 使用定时器控制。