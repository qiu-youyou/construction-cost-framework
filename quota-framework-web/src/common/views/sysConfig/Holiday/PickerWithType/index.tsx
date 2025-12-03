/*
 * @Author: SHUANG
 * @Date: 2023-10-16 09:40:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-16 10:02:28
 * @Description:
 */
import React, { useState } from 'react';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, Space, TimePicker } from 'antd';

const { Option } = Select;

type Props = {
  onChange?: (value?: string) => void;
};

type PickerType = 'year' | 'date' | 'month';

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

export default (props: Props) => {
  const [type, setType] = useState<PickerType>('date');

  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="date">日期</Option>
        <Option value="year">年份</Option>
        <Option value="month">月份</Option>
      </Select>
      <PickerWithType type={type} onChange={(v, dateString) => props?.onChange?.(dateString)} />
    </Space>
  );
};
