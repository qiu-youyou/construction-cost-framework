/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-31 17:17:50
 * @Description:
 */
/**
 * @Author: SHUANG
 * @Description: 查找当前节点父节点
 * @param {unknown[]} source 递归查找数据源
 * @param {unknown} current 根据当前查找
 * @param {string} itemKey 根据额当前查找数据的 某个 Key 判断 默认 id
 * @param {string} parentKey 当前查找数据对应 父级数据Key 默认 parentId
 * @return {unknown} 查找结果
 */
export const findParentByCurrent = (
  source: unknown[],
  current: unknown,
  itemKey?: string,
  parentKey?: string,
) => {
  const key = itemKey || 'id';
  const parentId = parentKey || 'parentId';
  let parent = {};
  const findParent = (arr: any[], cur: any) => {
    arr.forEach((item) => {
      if (item?.[key] === cur?.[parentId]) {
        parent = { ...item };
        return;
      }
      if (item?.children) findParent(item?.children, cur);
    });
  };
  findParent(source, current);
  return parent;
};

/**
 * @Author: SHUANG
 * @Description: 查找所有 default 为 true 的节点
 * @param {unknown} source
 * @param {string} findkey
 * @return {unknown} 查找结果
 */
export const getDefaultCheckedItems = (source: unknown[], findkey?: string) => {
  const defaultCheckedItems: any[] = [];

  const findChecked = (arr: any[], findkey?: string) => {
    if (!arr?.length) return;
    arr.forEach((item) => {
      if (item.checked) defaultCheckedItems.push(item);
      if (item?.children) findChecked(item?.children, findkey);
    });
  };

  findChecked(source, findkey);
  return defaultCheckedItems;
};

/**
 * @Author: SHUANG
 * @Description: 设置所有节点 是否可选中
 * @Date: 2023-10-31 17:10:31
 */
export const setDisabledCheckedItems = (source: any[], disableCheckbox?: boolean) => {
  return source.map((item) => {
    item.disableCheckbox = disableCheckbox;
    if (item?.children?.length) {
      const children = setDisabledCheckedItems(item.children, disableCheckbox);
      item.children = children;
    }
    return item;
  });
};
