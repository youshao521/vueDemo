# 运行管理中心前端

## 安装依赖

```bash
npm i
```

## 开发

```bash
# API 可以配置为后端服务器地址或 swagger 文件的路径
npm run dev -- --env.api="http://10.33.43.9:8001"
# npm run dev -- --env.api="./swagger.yaml"
```

## 测试

```bash
npm test
```

运行后会跑一遍 lint 和单元测试。

## 构建

```bash
npm run build
```

构建成果物在 `dist` 目录下。
