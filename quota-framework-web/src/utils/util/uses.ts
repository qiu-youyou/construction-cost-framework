/*
 * @Author: SHUANG
 * @Date: 2023-07-27 14:24:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-27 15:05:42
 * @Description:
 */
import { useEffect } from 'react';

/**
 * @Author: SHUANG
 * @Description: 页面初始化
 * @Date: 2023-07-27 14:25:13
 */
export const useMount = (callback: () => void) => {
  return useEffect(() => {
    return callback();
  }, []);
};
