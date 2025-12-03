---
title:  FAQ
sidemenu: true
order: 500
---

### FAQ
###### 以下整理了一些 关于框架常见的问题和答复，在有疑问或提问之前建议找找有没有出现过类似的问题。 <br />
<br />

### 系统级别的页签 出现了 重复的情况（特别是在 layout为 mix模式下）
> 如果你不希望显示某个路由的系统级页签，可以将 route.ts 配置项中的 name 移除； <br />
> switchTabs 会自动忽略没有 name属性的 route <br />

### 为什么 message.info、notification.open 或 Modal.confirm 等方法内的 ReactNode 无法继承 ConfigProvider 的属性？比如 getContainer。
> 静态方法是使用 ReactDOM.render 重新渲染一个 React 根节点上，和主应用的 React 节点是脱离的。建议使用 useMessage、useNotification 和 useModal 来使用  <br />
> 通过 hooks 创建 Modal  <br />
```ts
const [modal, contextHolder] = Modal.useModal();
modal.confirm({
  // ...
});
return <div>{contextHolder}</div>;
```

### BaseTable 并没有配置toolbar 但是 toolbar区域还存在，可以将toolbar区域去掉不要吗？
> toolBarRender 配置为 false，可以使toolbar区域不存在，如果为一个函数 可以重写toolbar  <br />
> 注意： toolbar区域不存在 Table的高度会自动计算，但列配置等相关 也会不存在。  <br />

### yarn 设置私服镜像后 安装报错：yarn 完整性检测失败
> 主要原因：可能是 最近版本的 yarn 要校验 offline cache 的完整性 <br />
> 解决方案：尝试使用 yarn --update-checksums 来升级所有安装过的包的 integrity checksums <br />

### .umi 缓存相关报错
> 主要原因：.umi 以及 .umi-productiond 都是工程的缓存文件, 有时会影响效果<br />
> 解决方案：删除 .umi 以及 .umi-productiond 文件夹，重启 <br />
