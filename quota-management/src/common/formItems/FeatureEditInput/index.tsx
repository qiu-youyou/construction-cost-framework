/*
 * @Author: SHUANG
 * @Date: 2024-01-31 16:39:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 09:28:13
 * @Description: 查询人员 选择人员信息
 */
import { CSSProperties, useState } from 'react';
import { Button, Tooltip, Input } from 'antd';
import { CloseCircleFilled, EditOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';

type Props = {
  // formItem 默认当前值
  value?: string;
  // formItem 默认事件
  onChange?: (value: string) => void;
};

export default (props: Props) => {
  /** PROPS */
  const { value, onChange } = props;

  const [newValue, setNewValue] = useState<string>('');

  /** 清空INPUT */
  const handleClearInput = () => {
    onChange?.('');
  };

  /** 触发按钮 */
  const TriggerButton = (
    <Tooltip title="编辑特征值">
      <Button className="BorderButtonPrimary">
        <EditOutlined />
      </Button>
    </Tooltip>
  );

  /** INPUT 样式 */
  const inputStyle: CSSProperties = {
    width: 'calc(100% - 26px)',
    marginRight: 2,
    height: 'auto',
  };

  /** 清空图标样式 */
  const clearIconStyle: CSSProperties = {
    right: 36,
  };

  const onInputChange = (e: any) => {
    setNewValue(e?.target?.value);
  };

  const handleOnSubmit = () => {
    onChange?.(newValue);
    return { status: 'SUCCESS' };
  };

  return (
    <div className="form-item-custom">
      <Input.TextArea value={value} style={inputStyle} rows={3} disabled />

      {!!value && (
        <span style={clearIconStyle} className="ClearInputButton" onClick={handleClearInput}>
          <CloseCircleFilled />
        </span>
      )}

      <BaseModal
        width={800}
        title="编辑特征值"
        style={{ top: 140 }}
        trigger={TriggerButton}
        onSubmit={handleOnSubmit}
      >
        <section style={{ height: 360, padding: 10 }}>
          <Input.TextArea style={{ height: '100%' }} defaultValue={value} onChange={onInputChange} />
        </section>
      </BaseModal>
    </div>
  );
};
