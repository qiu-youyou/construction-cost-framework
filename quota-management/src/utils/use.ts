/*
 * @Author: SHUANG
 * @Date: 2023-11-23 11:24:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 09:59:13
 * @Description:
 */

/**
 * @Author: SHUANG
 * @Description: 处理 rowSpan 合并
 * @Date: 2023-11-23 11:25:01
 * @param {any} data
 * @param {string} field
 */
export const useCellRowSpan = (data: any, field: string) => {
  let count = 0; //重复项的第一项
  let indexCount = 1; //下一项
  while (indexCount < data.length) {
    var item = data.slice(count, count + 1)[0]; //获取没有比较的第一个对象
    if (!item.rowSpan) {
      item.rowSpan = 1; //初始化为1
    }
    if (item[field] === data[indexCount][field]) {
      //第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为0
      item.rowSpan++;
      data[indexCount].rowSpan = 0;
    } else {
      count = indexCount;
    }
    indexCount++;
  }
  return data;
};

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export function accAdd(arg1: number, arg2: number) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
