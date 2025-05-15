# csmart-public-business开发文档
背景说明

## 样式
全局变量可在 global.less (@arco-design/web-vue/es/style/theme/global.less)
`node_modules\@arco-design\web-vue\dist\arco.css`

## 国际化


## 开发与构建

```bash
# 本地开发
npm run docs:dev

# 文档打包构建
npm run docs:build

# 组件库打包
npm run build-only
npm run build-only:px2rem # 主要打包出`lib-px2rem\style.css`(px转rem的样式), rem方案会用到

# 组件库在业务侧调试，使用`npm link`方式

# 组件库发包
# 1、执行`npm run build-only:all`
# 2、package.json的version需要+1
# 3、npm publish // 需要设置npm源，登录阿里云效账号后操作
# 4、本地打tag,例：`git tag -a v1.0.5 -m "新增chart图表组件7个"`
# 5、将tag推向远程仓库，例： `git push origin v1.0.5`
# 6、记得将改动合回`docs-dev`分支
```

## 如何封装`csmart-public-business`
以button为例

组件封装
1、在`packages/`新增组件，做组件封装;并在`index.ts`注册组件。
2、在`packages/assets/scss/`下新增组件样式
- `theme/scss/theme/normal/theme.css` 默认组题样式（覆盖arco组件的CSS变量或自定义CSS变量）


## 导航栏开发

```bash
# 本地开发
npm run dev

```
![设置sessionStorage数据](./docs/images/nav-dev.png)


## 项目目录说明


## 其他参考
[使用 VitePress 搭建及部署 vue 组件库文档](https://zhuanlan.zhihu.com/p/696928556)