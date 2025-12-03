/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-11 11:49:54
 * @Description:
 */

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
