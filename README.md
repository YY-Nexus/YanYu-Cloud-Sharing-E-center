# YanYu Cloud Sharing E-center

## 项目简介

YanYu Cloud Sharing E-center 是一个智能企业管理系统，为企业提供全方位的数据分析、组织管理、绩效激励等解决方案。系统采用现代化的设计理念和技术架构，致力于提升企业管理效率和决策质量。

## 🚀 核心功能

### 📊 数据中心
- **数据采集整合**: 多源数据接入、清洗规范、ETL流程管理
- **可视化分析**: 图表看板动态生成、多维钻取、实时监控
- **决策模型应用**: 智能算法支撑、场景化决策、预测分析
- **数据安全审计**: 权限管控、日志追溯、合规检查
- **数据质量管理**: 数据质量评估、异常检测、清洗规则
- **数据资产目录**: 元数据管理、血缘关系、资产盘点

### 👥 组织管理
- **组织架构**: 部门层级管理、职位体系、权限分配
- **人员招聘**: 招聘流程、候选人管理、面试安排
- **培训发展**: 培训计划、课程管理、技能评估
- **成本控制**: 人力成本分析、预算管理、费用控制
- **人际关系**: 团队协作、沟通管理、关系网络
- **考勤管理**: 出勤统计、请假管理、工时记录

### 🎯 绩效激励
- **目标对齐**: OKR管理、目标分解、进度跟踪
- **绩效评估**: 多维度评估、360度反馈、评估报告
- **激励机制**: 奖励体系、积分管理、认可机制
- **绩效分析**: 数据分析、趋势预测、改进建议
- **360度评估**: 全方位反馈、多角度评价、发展建议

### 🛡️ 客户服务
- **客户信息**: 客户档案、联系记录、服务历史
- **服务流程**: 工单管理、流程优化、SLA监控
- **满意度调研**: 满意度调查、反馈分析、改进措施
- **客户细分**: 客户分类、价值分析、精准营销

## 🛠️ 技术架构

### 前端技术栈
- **框架**: Next.js 15 (App Router)
- **UI库**: shadcn/ui + Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks
- **类型检查**: TypeScript

### 设计系统
- **主题色系**: 
  - 数据中心: Emerald (翠绿色)
  - 组织管理: Amber (琥珀色)
  - 绩效激励: Blue (蓝色)
  - 客户服务: Purple (紫色)
- **交互效果**: 悬停阴影、立体浮起、平滑动画
- **响应式设计**: 移动端优先、多屏幕适配

## 📁 项目结构

\`\`\`
├── app/                          # Next.js App Router
│   ├── data-center/             # 数据中心模块
│   │   ├── collection/          # 数据采集
│   │   ├── visualization/       # 可视化分析
│   │   ├── decision-model/      # 决策模型
│   │   ├── security-audit/      # 安全审计
│   │   ├── quality/            # 质量管理
│   │   └── catalog/            # 资产目录
│   ├── organization/           # 组织管理模块
│   │   ├── structure/          # 组织架构
│   │   ├── recruitment/        # 人员招聘
│   │   ├── training/           # 培训发展
│   │   ├── cost/              # 成本控制
│   │   ├── relations/         # 人际关系
│   │   └── attendance/        # 考勤管理
│   ├── performance/           # 绩效激励模块
│   │   ├── goal-alignment/    # 目标对齐
│   │   ├── evaluation/        # 绩效评估
│   │   ├── incentive/         # 激励机制
│   │   ├── analysis/          # 绩效分析
│   │   └── 360-review/        # 360度评估
│   └── customer-service/      # 客户服务模块
│       ├── info/              # 客户信息
│       ├── process/           # 服务流程
│       ├── satisfaction/      # 满意度调研
│       └── segmentation/      # 客户细分
├── components/                # 公共组件
│   ├── ui/                   # UI组件库
│   ├── dashboard-layout.tsx  # 仪表板布局
│   ├── logo.tsx             # Logo组件
│   └── theme-provider.tsx   # 主题提供者
├── lib/                     # 工具库
│   ├── utils.ts            # 工具函数
│   └── api-client.ts       # API客户端
├── public/                 # 静态资源
└── styles/                # 样式文件
\`\`\`

## 🎨 设计特色

### 视觉设计
- **立体视觉强化**: 所有交互元素都有立体浮起效果
- **主题色系统**: 每个模块都有独特的主题色，增强视觉识别
- **渐变进度条**: 进度条颜色与模块主题色匹配，支持平滑动画
- **统一卡片设计**: 左侧4px主题色边框，强化模块视觉关联

### 交互体验
- **悬停反馈**: 所有可交互元素都有悬停状态反馈
- **流畅动画**: 页面切换和状态变化都有平滑过渡动画
- **响应式布局**: 适配各种屏幕尺寸，移动端体验优化
- **直观导航**: 清晰的面包屑导航和侧边栏导航

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装依赖
\`\`\`bash
npm install
# 或
yarn install
# 或
pnpm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
\`\`\`bash
npm run build
# 或
yarn build
# 或
pnpm build
\`\`\`

## 📊 功能模块详情

### 数据中心指标
- **数据处理量**: 2.4TB (+12% 较上月增长)
- **活跃用户**: 1,247 (+8% 本月新增)
- **任务完成率**: 94.2% (+5% 效率提升)
- **客户满意度**: 4.8/5.0 (+0.3 五星评价)

### 核心功能模块
1. **数据中心** - 数据分析决策
2. **组织管理** - 人力资源体系
3. **绩效激励** - 目标考核体系

## 🔧 配置说明

### 主题配置
系统支持自定义主题配置，可在 `tailwind.config.js` 中修改：

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 自定义主题色
        primary: {...},
        secondary: {...},
      }
    }
  }
}
\`\`\`

### 环境变量
创建 `.env.local` 文件配置环境变量：

\`\`\`env
NEXT_PUBLIC_APP_NAME=YanYu Cloud Sharing E-center
NEXT_PUBLIC_APP_VERSION=v2.0
\`\`\`

## 📝 开发规范

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 代码格式化规范
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

### 提交规范
\`\`\`
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
\`\`\`

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 项目主页: [YanYu Cloud Sharing E-center](https://github.com/YY-Nexus/YanYu-Cloud-Sharing-E-center.git)


**Powered by YanYu Cloud Sharing E-center v2.0**

*智能管理系统，为您的企业提供全方位的数据分析、组织管理、绩效激励等解决方案*
