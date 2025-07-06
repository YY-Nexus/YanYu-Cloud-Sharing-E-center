#!/bin/bash

# 『言语』云享e中心 - 本地开发环境设置脚本

# 确保脚本在错误时退出
set -e

echo "设置『言语』云享e中心本地开发环境..."

# 检查Node.js版本
NODE_VERSION=$(node -v)
echo "检测到Node.js版本: $NODE_VERSION"

# 检查是否满足最低版本要求
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1 | tr -d 'v')
if [ $NODE_MAJOR_VERSION -lt 18 ]; then
  echo "错误: 需要Node.js v18或更高版本"
  echo "请升级Node.js后重试"
  exit 1
fi

# 安装依赖
echo "安装项目依赖..."
npm install

# 创建环境变量文件
echo "创建.env.local文件..."
if [ ! -f .env.local ]; then
  cat > .env.local << EOF
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
EOF
  echo ".env.local文件已创建"
else
  echo ".env.local文件已存在，跳过创建"
fi

# 创建VSCode设置
echo "创建VSCode设置..."
mkdir -p .vscode
cat > .vscode/settings.json << EOF
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\$$([^)]*)\$$", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
EOF

# 启动开发服务器
echo "设置完成！启动开发服务器..."
npm run dev
