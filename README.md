# 基于 vue + ant.design pro 的管理端脚手架

## 系统默认配置

路径：`/src/config/default.js`

`systemName` 需要修改为权限系统上对应的系统名

`baseUrl` 需要修改为对应的服务端接口地址

`isLocalRouter` 是否启用本地路由配置

## 系统路由配置

路径：`/src/router/router.local.js`

## 基本命令

```bash
yarn start # 启动
yarn start:mock # 本地mock数据启动
yarn build:test # 测试环境构建
yarn build:prod # 正式环境构建
digo api # 自动化接口生成，基于 api.json
```

## 迭代流程

主分支：master

集成分支：develop

开发分支：feat/xxx (建议可以以交付日期命名，例如：feat/0224)

注:整个开发流程大致如下：

- 涉及多个分支共同合作开发的，则必须要从 master 拉取集成分支 develop ,然再拉取各个开发分支 feat/xxx ,开发完成合入 develop,集成完成合入 master
- 单独小需求开发，master 直接拉取开发分支 feat/xxx ,开发完成后合入 master
- 问题修复，master 直接拉 hotfix/xxx 分支，完成后合入 master
