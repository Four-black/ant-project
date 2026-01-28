# Ant Design Pro 项目结构文档

## 项目概述

这是一个基于 [Ant Design Pro](https://pro.ant.design) 的企业级中后台前端解决方案，使用 React 19 + TypeScript + UmiJS 4.x + Ant Design 5.x 技术栈构建。

- **项目名称**: ant-design-pro
- **版本**: 6.0.0
- **Node 版本要求**: >= 20.0.0

---

## 目录结构

```
myapp/
├── config/                 # 项目配置文件
├── mock/                   # Mock 数据服务
├── public/                 # 静态资源
├── src/                    # 源代码
├── tests/                  # 测试文件
├── types/                  # 类型定义
└── 配置文件                 # 项目根目录配置
```

---

## 一、根目录配置文件

| 文件名 | 说明 |
|--------|------|
| `package.json` | 项目依赖与脚本配置 |
| `tsconfig.json` | TypeScript 编译配置 |
| `biome.json` | Biome 代码格式化与 Lint 配置 |
| `jest.config.ts` | Jest 测试框架配置 |
| `.commitlintrc.js` | Git Commit 规范配置 |
| `.editorconfig` | 编辑器统一配置 |
| `.gitignore` | Git 忽略文件配置 |
| `.lintstagedrc` | Lint-Staged 配置 |
| `.npmrc` | NPM 配置 |
| `.husky/` | Git Hooks 配置目录 |

---

## 二、config/ - 项目配置

| 文件名 | 说明 |
|--------|------|
| `config.ts` | UmiJS 主配置文件，包含路由、代理、主题等核心配置 |
| `routes.ts` | 路由配置，定义所有页面路由规则 |
| `proxy.ts` | 开发环境代理配置 |
| `defaultSettings.ts` | 布局默认设置（主题、布局模式、Logo等） |
| `oneapi.json` | OpenAPI 配置文件 |

---

## 三、src/ - 源代码目录

### 3.1 根级文件

| 文件名 | 说明 |
|--------|------|
| `app.tsx` | 运行时配置入口，定义全局状态、布局配置、权限等 |
| `access.ts` | 权限控制配置 |
| `global.tsx` | 全局组件 |
| `global.less` | 全局 Less 样式 |
| `global.style.ts` | 全局 CSS-in-JS 样式 |
| `loading.tsx` | 全局加载组件 |
| `requestErrorConfig.ts` | 请求错误处理配置 |
| `typings.d.ts` | 全局类型声明 |
| `manifest.json` | PWA 配置清单 |
| `service-worker.js` | Service Worker 配置 |

### 3.2 src/components/ - 公共组件

| 目录/文件 | 说明 |
|-----------|------|
| `index.ts` | 组件统一导出 |
| `Footer/` | 页脚组件 |
| `HeaderDropdown/` | 头部下拉菜单组件 |
| `RightContent/` | 右侧内容组件 |
| └─ `AvatarDropdown.tsx` | 头像下拉菜单 |
| └─ `index.tsx` | 右侧内容入口 |

### 3.3 src/pages/ - 页面模块

#### 基础页面
| 文件 | 说明 |
|------|------|
| `404.tsx` | 404 错误页面 |
| `Admin.tsx` | 管理员页面 |
| `Welcome.tsx` | 欢迎页面 |

#### 用户模块 (user/)
| 目录 | 说明 |
|------|------|
| `login/` | 用户登录页面 |
| `register/` | 用户注册页面 |
| `register-result/` | 注册结果页面 |

#### 仪表盘模块 (dashboard/)
| 目录 | 说明 |
|------|------|
| `analysis/` | 数据分析页 - 展示数据可视化图表 |
| `monitor/` | 实时监控页 - 实时数据监控 |
| `workplace/` | 工作台页 - 个人工作台 |

#### 表单模块 (form/)
| 目录 | 说明 |
|------|------|
| `basic-form/` | 基础表单 - 单一表单提交 |
| `step-form/` | 分步表单 - 多步骤表单向导 |
| `advanced-form/` | 高级表单 - 复杂表单场景 |

#### 列表模块 (list/)
| 目录 | 说明 |
|------|------|
| `table-list/` | 表格列表 - 标准表格展示 |
| `basic-list/` | 基础列表 - 简单列表展示 |
| `card-list/` | 卡片列表 - 卡片式列表 |
| `search/` | 搜索列表 |
| └─ `articles/` | 文章搜索 |
| └─ `projects/` | 项目搜索 |
| └─ `applications/` | 应用搜索 |

#### 详情模块 (profile/)
| 目录 | 说明 |
|------|------|
| `basic/` | 基础详情页 |
| `advanced/` | 高级详情页 |

#### 结果模块 (result/)
| 目录 | 说明 |
|------|------|
| `success/` | 成功结果页 |
| `fail/` | 失败结果页 |

#### 异常模块 (exception/)
| 目录 | 说明 |
|------|------|
| `403/` | 403 无权限页面 |
| `404/` | 404 页面不存在 |
| `500/` | 500 服务器错误页面 |

#### 账户模块 (account/)
| 目录 | 说明 |
|------|------|
| `center/` | 个人中心 |
| `settings/` | 个人设置 |

#### 其他模块
| 目录 | 说明 |
|------|------|
| `table-list/` | CRUD 表格示例（根级） |

### 3.4 src/services/ - API 服务

| 目录 | 说明 |
|------|------|
| `ant-design-pro/` | 项目主要 API 服务 |
| └─ `api.ts` | 通用 API 接口 |
| └─ `login.ts` | 登录相关接口 |
| └─ `typings.d.ts` | API 类型定义 |
| `swagger/` | Swagger 生成的 API |
| └─ `pet.ts` | 宠物模块 API（示例） |
| └─ `store.ts` | 商店模块 API（示例） |
| └─ `user.ts` | 用户模块 API（示例） |

### 3.5 src/locales/ - 国际化

支持以下语言：

| 语言代码 | 语言名称 |
|----------|----------|
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en-US` | 英语（美国） |
| `ja-JP` | 日语 |
| `pt-BR` | 葡萄牙语（巴西） |
| `bn-BD` | 孟加拉语 |
| `fa-IR` | 波斯语 |
| `id-ID` | 印度尼西亚语 |

每个语言目录下包含：
- `component.ts` - 组件文案
- `globalHeader.ts` - 全局头部文案
- `menu.ts` - 菜单文案
- `pages.ts` - 页面文案
- `pwa.ts` - PWA 相关文案
- `settingDrawer.ts` - 设置抽屉文案
- `settings.ts` - 设置页文案

---

## 四、mock/ - Mock 数据

| 文件 | 说明 |
|------|------|
| `user.ts` | 用户相关 Mock 数据 |
| `notices.ts` | 通知消息 Mock 数据 |
| `route.ts` | 路由 Mock 数据 |
| `listTableList.ts` | 表格列表 Mock 数据 |
| `analysis.mock.ts` | 数据分析 Mock 数据 |
| `monitor.mock.ts` | 监控页 Mock 数据 |
| `workplace.mock.ts` | 工作台 Mock 数据 |
| `requestRecord.mock.js` | 请求记录 Mock 数据 |

---

## 五、public/ - 静态资源

| 文件/目录 | 说明 |
|-----------|------|
| `favicon.ico` | 网站图标 |
| `logo.svg` | Logo 图片 |
| `pro_icon.svg` | Pro 图标 |
| `CNAME` | GitHub Pages 域名配置 |
| `icons/` | 图标资源目录 |
| `scripts/` | 静态脚本 |
| └─ `loading.js` | 加载动画脚本 |

---

## 六、tests/ - 测试

| 文件 | 说明 |
|------|------|
| `setupTests.jsx` | Jest 测试环境配置 |

---

## 七、types/ - 类型定义

| 文件/目录 | 说明 |
|-----------|------|
| `index.d.ts` | 全局类型声明 |
| `cache/` | 缓存类型定义 |

---

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器（带 Mock）
npm start

# 启动开发服务器（不带 Mock）
npm run start:dev

# 构建生产版本
npm run build

# 运行测试
npm test

# 代码检查
npm run lint

# 预览生产构建
npm run preview
```

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.1.0 | UI 框架 |
| Ant Design | ^5.25.4 | UI 组件库 |
| @ant-design/pro-components | ^2.7.19 | Pro 组件库 |
| @umijs/max | ^4.3.24 | Umi Max 企业级框架 |
| TypeScript | ^5.6.3 | 类型支持 |
| antd-style | ^3.7.0 | CSS-in-JS 方案 |
| @ant-design/plots | ^2.6.0 | 图表库 |
| @antv/l7 | ^2.22.7 | 地图可视化 |
| dayjs | ^1.11.13 | 日期处理 |
| Jest | ^30.0.4 | 测试框架 |
| Biome | ^2.0.6 | 代码格式化与 Lint |

---

## 项目特性

- ✅ **企业级开箱即用** - 完整的中后台解决方案
- ✅ **TypeScript 支持** - 完整的类型定义
- ✅ **国际化支持** - 支持 8 种语言
- ✅ **权限控制** - 基于路由的权限管理
- ✅ **Mock 数据** - 内置 Mock 服务
- ✅ **PWA 支持** - 渐进式 Web 应用
- ✅ **主题定制** - 支持主题配置
- ✅ **代理配置** - 开发环境代理支持
- ✅ **代码规范** - Biome + Husky + Commitlint

---

*文档生成时间：2026年1月28日*
