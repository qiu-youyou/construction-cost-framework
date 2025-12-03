/*
 * @Author: SHUANG
 * @Date: 2022-07-15 14:50:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-31 16:54:34
 * @Description: 一些常量
 */
const LAYOUTCOL: any = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
  colProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6, xxl: 6 },
  colPropsMin: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6, xxl: 4 },

  defaultLayout: {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
    colProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 },
  },
  defaultMaxLayout: {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
    colProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 },
  },

  largeLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
    colProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 },
  },

  maxLayout: {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
    colProps: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  },
};

export { LAYOUTCOL };
