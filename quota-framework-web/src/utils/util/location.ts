/*
 * @Author: SHUANG
 * @Date: 2022-11-28 10:32:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-22 15:24:41
 * @Description: 业务相关
 */

export const setLocationUrl = (url: string) => {
  sessionStorage.setItem('LOCATIONSURL', url);
};

export const clearLocationUrl = () => {
  sessionStorage.removeItem('LOCATIONSURL');
};

export const getLocationUrl = () => {
  return sessionStorage.getItem('LOCATIONSURL');
};
