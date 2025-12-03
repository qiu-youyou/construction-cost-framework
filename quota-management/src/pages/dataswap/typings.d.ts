/*
 * @Author: SHUANG
 * @Date: 2024-04-18 15:32:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 15:47:24
 * @Description: 同步接口数据
 */
export type DataswapProps = {
  /** 同步成功 */
  onSuccess?: () => void;
  /** 同步失败 */
  onError?: () => void;
  /** 按钮文字 */
  buttonText?: string;
};
