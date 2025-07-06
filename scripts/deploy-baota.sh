#!/bin/bash

# 『言语』云享e中心 - 宝塔面板部署脚本

# 确保脚本在错误时退出
set -e

echo "开始部署『言语』云享e中心..."

# 变量设置
APP_DIR="/www/wwwroot/cloud-sharing-center"
BACKUP_DIR="/www/backup/cloud-sharing-center"
DATE=$(date +"%Y%m%d%H%M%S")

# 创建备份
if [ -d "$APP_DIR" ]; then
  echo "创建当前版本备份..."
  mkdir -p $BACKUP_DIR
  tar -czf "$BACKUP_DIR/backup-$DATE.tar.gz" -C $APP_DIR .
fi

# 确保应用目录存在
mkdir -p $APP_DIR

# 复制新文件到应用目录
echo "部署新版本..."
cp -r ./* $APP_DIR/

# 安装依赖
echo "安装依赖..."
cd $APP_DIR
npm install --production

# 构建应用
echo "构建应用..."
npm run build

# 使用PM2管理进程
echo "配置PM2进程管理..."
if pm2 list | grep -q "cloud-sharing-center"; then
  pm2 reload cloud-sharing-center
else
  pm2 start npm --name "cloud-sharing-center" -- start
fi

# 配置Nginx
echo "配置Nginx..."
cat > /www/server/panel/vhost/nginx/cloud-sharing-center.conf << EOF
server {
    listen 80;
    server_name cloud-sharing-center.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # 静态资源缓存
    location /_next/static/ {
        alias $APP_DIR/.next/static/;
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images/ {
        alias $APP_DIR/public/images/;
        expires 7d;
        access_log off;
        add_header Cache-Control "public, max-age=604800";
    }
}
EOF

# 重启Nginx
echo "重启Nginx..."
/etc/init.d/nginx reload

echo "『言语』云享e中心部署完成！"
echo "访问地址: http://cloud-sharing-center.example.com"
