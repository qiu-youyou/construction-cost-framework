/*
 * @Author: SHUANG
 * @Date: 2022-10-13 16:32:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-05-08 15:08:13
 * @Description:
 */
type PropsDefine = {
  oldValue: number | string;
  currentValue: number | string;
  billStatus?: number | string;
};

import { Typography } from 'antd';
const { Text } = Typography;

export default ({ oldValue, currentValue, billStatus }: PropsDefine) => {
  if (currentValue === 0) {
    return <></>;
  }

  if (oldValue !== currentValue && billStatus != undefined && billStatus != '0' && billStatus != '-5') {
    return (
      <Text style={{ color: 'red' }} ellipsis={{ tooltip: currentValue }}>
        {currentValue}
      </Text>
    );
  }
  return <Text ellipsis={{ tooltip: currentValue }}>{currentValue}</Text>;
};
