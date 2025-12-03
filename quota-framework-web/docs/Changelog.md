---
title: ChangeLog
sidemenu: true
order: 2
---
## ChangeLog
###### 以下是关于平台的 一些更新记录，新功能 bug修复以及优化项 都会在此记录 <br />
<br />

### 2024-04-25 更新
> 平台包更新 jd-framework-web@1.2.5 <br />
> 修复 BaseTree 高度问题 <br />

### 2024-04-15 更新
> 平台包更新 jd-framework-web@1.2.4 <br />
> 删除编辑组织机构 是否显示 <br />
> 修复 plusLevel disabled 属性不生效的问题 <br />

### 2024-04-12 更新
> 平台包更新 jd-framework-web@1.2.3 <br />
> 修复流程按钮 部分 没有 workFlowKey <br />

### 2024-04-09 更新
> 平台包更新 jd-framework-web@1.2.2 <br />
> 增加树形字典 <br />


### 2024-03-20 更新
> 平台包更新 jd-framework-web@1.2.1 <br />
> BaseReport 更新 <br />

### 2024-03-20 更新
> 平台包更新 jd-framework-web@1.2.0 <br />
> BaseTree、BaseTable 支持传入 defaultCurrent 默认选中节点，并默认滚动定位到该节点位置。 <br />
> LevelButton 向外传递 当前操作 level key

### 2024-03-13 更新
> 平台包更新 jd-framework-web@1.1.9 <br />
> 行编辑增加 年月日时分秒 修改 <br />
> request 增加 requestType: 'form' | 'json' 模式配置，发送 formData file 请配置为 form  <br />


### 2024-02-01 更新
> 平台包更新 jd-framework-web@1.1.8 <br />
> 修复虚拟滚动高度不准确 的问题

### 2024-02-01 更新
> 平台包更新 jd-framework-web@1.1.7 <br />
> BaseSchemaForm 支持 setpsForm 分步表单，column 项配置成数组 <br />
> BaseSchemaForm 支持 cascader 级联选择
``` ts
// 步骤表单
// 1. 受限配置 setps
const schemaFomProps = [
  steps: [{
    title: '第一步',
    grid: true,
    layout: 'horizontal',
    className: 'customModalForm',
    wrapperCol: { span: 'auto' },
    labelCol: { span: '100px' },
    colProps: { span: 12 },
  },
  {
    title: '第一步',
    grid: true,
    layout: 'horizontal',
    className: 'customModalForm',
    wrapperCol: { span: 'auto' },
    labelCol: { span: '100px' },
    colProps: { span: 12 },
  }],
]

// 2. columns
const columns FormColumnsDefine<TYPE>[] = [
  [
    {},
    {}
  ],
  [
    {}
  ]
]
```


### 2024-01-29 更新
> 平台包更新 jd-framework-web@1.1.6 <br />
> 流程组件 盖章位置样式 优化 <br />
> 修复部分小问题

### 2024-01-18 更新
> 平台包更新 jd-framework-web@1.1.5 <br />
> 修复了 流程相关弹窗 在 Table 中的 CustomRender中使用时 双击影响单据的问题 <br />

### 2024-01-15 更新
> 平台包更新 jd-framework-web@1.1.4 <br />
> 系统模块 增加了权限控制 <br />

### 2024-01-09 更新
> 平台包更新 jd-framework-web@1.1.3 <br />
> rowSelection 支持 columnsTitle, renderCell <br />


### 2023-12-29 更新
> 平台包更新 jd-framework-web@1.1.2 <br />
> 登录背景，支持了视频格式的背景配置；可在静态资源中上传视频资源 平台配置模块中配置<br />
> UI：优化登录页样式 <br />


### 2023-12-28 更新
> 平台包更新 jd-framework-web@1.1.1 <br />
> 主要修复：Layout 为 mix 时，混合菜单时会出现 系统标签页的重复 <br />
> layout 为 mix 最上级路由不需要配置 name <br />
```ts
{
 -name: '首页', // 最外层的父级不需要配置 name （仅在layout 为 mix 模式下！！！）
  path: 'home',
  icon: 'HomeOutlined',
  routes: [
    {
      name: '首页',
      path: '/home/index',
      component: '@/common/views/home',
      icon: 'HomeOutlined',
    },
  ]
}
```



### 2023-12-27 更新
> 平台包更新 jd-framework-web@1.1.0 <br />
> 提升小版本 1.1; 对陈年老BUG修复、待优化的功能已经进行支持；<br />
> 主要修复：BaseTable 嵌套多级表头 列拖拽不支持的问题 <br />
> 主要修复：BaseCard 的全屏幕切换效果，全屏幕 由于区域放大到全屏导致操作层级不够的问题 <br />
> 主要修复：layout 为 mix 模式时 路由默认重定向问题 <br />
> 新UI：首页新UI（如果有项目重写想要支持需要重新应用）<br />
###### 升级代码兼容： <br />
更新平台包 <br />
请在 `src/app.tsx` 文件中 添加以下代码: <br />
注意：你如果重写了 `src/app/render/childrenRender.tsx` 请注意检查代码！<br />
```ts
/** 1. 引入 provider */
+ import { configProvider } from 'jd-framework-web/package/app/provider';
...
/** 2. 调用 provider */
+ configProvider();
```

###### 升级代码兼容： <br />
路由配置文件中不再需要 手写 redirect，现在平台已经根据权限自动redirect。建议移除掉类似代码。平台包中已经移除<br />
```ts
/** 1. 移除route中冗余的 redirect  */
- {
- path: '/message',
- redirect: '/message/notice',
- },
```

### 2023-12-25 更新
> 平台包更新 jd-framework-web@1.0.20 <br />
> 新支持：BaseTable 支持自定义 toolbar 区域是否存在 <br />
> 新UI：首页
```ts
  /**
   * @name toolBarRender
   * @description Table工具栏区域、false为不存在
   */
  toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;
```

### 2023-12-07 更新
> 平台包更新 jd-framework-web@1.0.19 <br />
> 主要修复：BaseTable 根据参数获取数据、分页重置问题 <br />

### 2023-11-30 更新
> 平台包更新 jd-framework-web@1.0.18 <br />
> 新支持：COMMON MENU 菜单管理支持选择预览图标，系统自定义图标配置； <br />
> 新支持：BASEMODAL 支持 右下角触发拖拽 拖拽调整窗口尺寸； <br />
> 主要修复：修复因各个项目路由模式不同 引起的权限判断不准确问题； <br />
> 主要修复：表单动态布局问题，目前根据外层元素的窗口大小变化 <br />

### 2023-11-23 更新
> 平台包更新 jd-framework-web@1.0.16 <br />
> 做了一些优化、修复了一些Bug、嘎了一个程序员祭天； <br />
> 新支持：BaseTree 组件 支持了与 BaseTable相同的 数据重排； <br/ >


### 2023-11-08 更新
> 平台包更新 jd-framework-web@1.0.15 <br />
> 主要修复：BaseTable 组件 是否支持动态列； <br />

###### NEW API： <br />
``` ts
/**
 * @name columnsDynamic
 * @description 是否开启动态列 支持 columns useState变量 传入
 * @type boolean
 * @default false
 */
columnsDynamic?: boolean;
```

###### 升级代码兼容： <br />
> ```ts
> // 需要动态列的表格 配置 columnsDynamic 为 true
> + columnsDynamic: true
> ```

### 2023-11-03 更新
> 平台包更新 jd-framework-web@1.0.14 <br />
> 主要修复：ProcessBusiness 流程组件 配置 tabsConfig ，原key 丢失问题； <br />
> 新支持：BaseTable 组件 支持配置 columnSortable 开启所有列排序，你也可以在每个 column中单独配置列； <br />
> 新变化：BaseTable 组件默认 所有列 开启 ellipsis 无需配置， 如果你不需要 你也可以在 column中单独配置为 false； <br />

###### NEW API： <br />
``` ts
/**
 * @name columnSortable
 * @description table 所有列是否支持排序 排序统一配置 你也可以在 columnItem 中配置
 * @type boolean
 * @default false
 */
columnSortable?: boolean;
```
###### 升级代码兼容： <br />
> ```ts
> // table columns 移除所有 ellipsis 为true 的代码
> - ellipsis: true
> ```

### 2023-11-02 更新
> 平台包更新 jd-framework-web@1.0.13 <br />
> 主要修复：BaseTable 组件，digit类型 三位以上小数精度丢失问题； <br />
> 新支持： BaseTable 组件，支持配置 空文本列、为0 的 digit列，自定义文本 ； <br />

###### NEW API： <br />
``` ts
/**
 * @name columnEmptyText
 * @description 列值为空时 显示的文本
 * @type string
 * @default ''
 */
columnEmptyText?: string;

/**
 * @name columnDigitNilText
 * @description 列值为0时 显示的文本 只有 digit 列支持
 * @type string
 * @default 0
 */
columnDigitNilText?: string;
```


### 2023-10-31 更新
> 平台包更新 jd-framework-web@1.0.12 <br />
> BaseTree 支持复制粘贴 节点； <br />
> API 与 BaseTable 相同； <br />


### 2023-10-24 更新
> 平台包更新 jd-framework-web@1.0.11 <br />
> BaseForm Columns 统一了与 BaseTable Columns API 一致的属性； <br />
> valueType: select 默认支持了 搜索查询； <br />
> valueType: digit 默认支持了 输入负数； 表格不显示步幅控制器； <br />
> BaseForm Columns 与 BaseTable Columns 支持了 selectWritingIn； 默认false 开启可支持 select可输入任意字符串保存； <br />

###### 升级代码兼容： <br />
> ```ts
> // form columns
> - import { ProFormColumnsType } from '@ant-design/pro-form';
> + import { FormColumnsDefine } from 'jd-framework-web/package/components';
> - const columns: ProFormColumnsType<yourTypes>[];
> + const columns: FormColumnsDefine<yourTypes>;
> ```

> ```ts
> // // form columns
> - { ...,  fieldProps: ..., render: ...};
> + { ...,  customFieldProps: ..., customRender: ...};
> ```

###### BaseForm API变动: <br />
``` ts
/** columns */

/** 这里弃用了render 更改为 customRender */
customRender?: ProColumns['render'];

/** 这里弃用了 fieldProps 更改为 customFieldProps */
customFieldProps?: ProColumns['fieldProps'];
```

###### BaseForm & BaseTable API变动: <br />
``` ts
/** columns */
  {
    title: '下拉选择',
    dataIndex: 'mUnit',
    valueType: 'select',
    valueEnum: {
      选项1: { text: '选项1' },
      选项2: { text: '选项2' },
      选项3: { text: '选项3' },
    },
    selectWritingIn: true, // 《 新增属性 》 Select支持输入任意字符串
    customFieldProps: (form) => ({
      fieldNames: { label: 'label', value: 'label' },
    }),
  },
```


### 2023-10-21 更新
> 平台包更新 jd-framework-web@1.0.10 <br />
> BaseTable Toolbar：操作按钮OnSubmit可接收 current 以及 selection； <br />
> onSubmit?: (params: T, actionCurrent?: T, actionSelections?: T[]) => void；

### 2023-10-18 更新
> 平台包更新 jd-framework-web@1.0.9 <br />
> BaseTable：修复搜索和行编辑两个表单项冲突问题； <br />

### 2023-10-17 更新
> 平台包更新 jd-framework-web@1.0.8 <br />
> BaseTree：修复根据参数动态请求接口时 树结构自动展开全部 失效的 bug； <br />


### 2023-10-16 更新
> 平台包更新 jd-framework-web@1.0.7 <br />
> 修复一些已知问题； <br />

### 2023-10-13 更新
> 平台包更新 jd-framework-web@1.0.6 <br />
> 功能增加：系统内链外部链接功能； <br />
> 1. 更新平台包
> 2. 请在 `src/common/views/` 新建一个 `Window` 文件夹 内部包含一个 `index.tsx` 文件，并添加以下代码
> ```ts
> + import { JDCMDWindow } from 'jd-framework-web/package/common';
> + export default JDCMDWindow;;
> ```


### 2023-10-11 更新
> 平台包更新 jd-framework-web@1.0.5 <br />
> 修复了: ts 使用 namespace 引用不到本地的问题 <br />
> 1. 更新平台包
> 2. 请将 `common/services/system/typings.d.ts` 文件进行以下修改
> ```ts
> + export = SYS;
> + export as namespace SYS;
> ```
> 3. 请将 `common/services/user/typings.d.ts` 文件进行以下修改
> ```ts
> + export = USER;
> + export as namespace USER;
> ```

### 2023-10-10 更新
> 平台包更新 jd-framework-web@1.0.4 <br />
> 主要修复了读取配置图片的相关问题 <br />
> 请将 proxy 文件进行以下修改 (将 DEVPATH export)
> ```ts
> - const DEV_PATH = 'http://*/'
> + export const DEV_PATH = 'http://*/';
> ```
> 更新后可删除掉本地 public下 system文件夹（中有两个文件 logo，logingb） 可减少打包后静态资源的体积<br />

### 2023-10-08 更新
> 发布平台包 jd-framework-web <br />
> 发布平台脚手架 jd-web-rigger <br />


### 2023-08-23 更新
###### 1. BaseTable 单元格编辑 支持了 Tab按键 到下一项 <br />

> 按下 TAB 会自动定位到下一个可编辑单元格并保存当前修改 <br />
> 按下 ENTER 退出编辑状态并保存当前修改  <br />
> 按下 ESC 即可退出编辑 不保存当前修改 <br />

###### 2. 平台新增功能 用户N个月强制修改密码
> 强制修改密码 如果不修改密码 不能进入系统 <br />
> 修改密码后 无需重新登录 <br />

### 2023-08-17 更新
###### 1. 系统权限控制逻辑更新 新增默认权限表

> 概念：系统中对数据的操作权限 受默认权限表控制，当然你也可以手动控制， <br />
> 选择受默认权限表控制 ，你将不用再关心权限逻辑 也不用在书写权限代码，这一切将在内部处理  <br />
> BaseTable BaseTree BaseReport BaseProcessButton 受支持 <br />
> 如果你想查阅 默认权限表 《系统文档 -> 默认权限》 <br />

###### 2. 受支持API
``` ts
  /**
   * @name toolbarAuthority
   * @description toobar是否拥有权限 如果你想根据默认权限表生成配置为true 如果你想控制不配置即可
   *              如果你开启了默认权限表 那么按钮的 auth 属性将不生效
   * @default false
   */

  toolbarAuthority?: boolean;
```

### 2023-08-15 更新
###### 1. 当前行、勾选行操作逻辑优化。新增 onActionCurrent

> 说明：不同于 onCurrent <br />
> 系统中目前逻辑为 当前行 onCurrent、 勾选行 onSelection、当前操作行 onActionCurrent <br />
> 当前操作行表示： 有且只有一行的勾选行 或 没有勾选的当前行 <br />
> 大多数逻辑在 BaseTable内部已处理 如果你需要 当前操作行 ; 请使用 该API接收 <br />

###### 2. BaseTable API变化:
``` ts
onActionCurrent?: (v?: T) => void;
/** example */
onActionCurrent: (record) => setCurrentRole(record),
```


### 2023-08-11 更新
###### 1. BaseTable 废弃API initNextTick
<br />

### 2023-08-01 更新
###### 1. BaseModal 支持 style配置 (可用于设置浮层的样式，调整浮层位置等)
``` ts
/** BaseModalProps */
style?: CSSProperties;

/** example */
modalProps: { style: { top: 200 } },
```

### 2023-07-28 更新
###### 1. BaseTable 即点即编功能重构
###### 2. BaseTable API变化:
``` ts
/** columns */

/** 这里弃用了render 更改为 customRender */
customRender?: ProColumns['render'];

/** 这里弃用了 fieldProps 更改为 customFieldProps */
customFieldProps?: ProColumns['fieldProps'];
```

### 2023-07-25 更新
###### 1. BaseTable 合计行配置 支持前台合计｜后台合计