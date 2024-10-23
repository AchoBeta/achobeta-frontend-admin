# 使用 Node.js 18 的 Alpine Linux 版本作为基础镜像，体积小且适合生产环境
FROM node:18-alpine AS builder

# 设置工作目录为 /app
WORKDIR /app

# 全局安装 pnpm 包管理工具
RUN npm install -g pnpm

# 将 package.json 和 pnpm-lock.yaml 文件复制到工作目录中
COPY package.json pnpm-lock.yaml ./

# 使用 pnpm 安装项目依赖，并确保使用的是锁定的依赖版本
RUN pnpm install --frozen-lockfile

# 将项目的所有文件复制到工作目录中
COPY . .

# 执行项目的构建过程（通常是针对 Nuxt.js 等框架生成静态文件或打包项目）
RUN pnpm build

# 第二阶段，使用 Node.js 18 的 Alpine Linux 版本作为基础镜像，适合生产环境
FROM node:18-alpine

# 设置工作目录为 /app
WORKDIR /app

# 全局安装 PM2，用于管理和运行 Node.js 应用程序
RUN npm install -g pm2

# 将第一阶段构建的 .output 目录（Nuxt.js 编译结果）复制到当前容器中
COPY --from=builder /app/.output ./.output

# 将第一阶段的 ecosystem.config.js（PM2 配置文件）复制到当前容器中
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js

# 暴露 3000 端口，用于访问应用程序
EXPOSE 3000

# 使用 pm2-runtime 启动应用程序，根据 ecosystem.config.js 文件运行
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
