/*
 * @Author: SHUANG
 * @Date: 2023-06-12 10:10:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-20 17:09:12
 * @Description: 自定义单选按钮
 */
import { Radio } from 'antd';

import React, { useState } from 'react';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
  valueEnum?: any;
};

export default React.memo((props: Props) => {
  const [value, setValue] = useState<string>();

  const handleSetValue = (key?: string) => {
    setValue(key);
    props?.onChange?.(key);
  };

  /** 相同操作 取消选中 */
  const handleOnClick = (key: string) => {
    if (value === key) {
      handleSetValue();
      return;
    }
    handleSetValue(key);
  };

  return (
    <Radio.Group value={value} buttonStyle="solid" size="small">
      {!!props?.valueEnum &&
        Object.keys(props?.valueEnum).map((key) => (
          <Radio.Button key={key} onClick={() => handleOnClick(key)} value={key}>
            {props?.valueEnum?.[key]?.text || ''}
          </Radio.Button>
        ))}
    </Radio.Group>
  );
});
