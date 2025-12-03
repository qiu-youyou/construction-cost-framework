/*
 * @Author: SHUANG
 * @Date: 2024-04-23 11:02:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 11:13:17
 * @Description: 选择人材机
 */

import { Button, InputNumber, Modal } from 'antd';
import { CSSProperties, useState } from 'react';
import { FileSearchOutlined } from '@ant-design/icons';
import { matMainQueryPageInfoNotExistsMat } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatContentTable/useServices';
import DbMatBranchInsert from '@/pages/database/common/DbMatBranchInsert';

type Props = {
  // formItem 默认当前值
  value?: string;
  // formItem 默认事件
  onChange?: (value?: string, current?: any) => void;

  disabled: boolean;
};

export default (props: Props) => {
  /** PROPS */
  const { disabled } = props;
  const { value, onChange } = props;

  const [current, setCurrent] = useState<any>();

  /** useModal */
  const [modal, contextHolder] = Modal.useModal();

  /** 保存输入的内容 */
  const inputOnChange = (e: any) => onChange?.(e);

  /** 选择人材机 */
  const handleOnSave = async () => {
    if (!current) {
      modal.warning({ title: '继续操作', content: '请选择人材机!' });
      return;
    }

    onChange?.(current?.matPrice, current);
    return { status: 'SUCCESS' } as any;
  };

  /** 文本样式 */
  const inputStyle: CSSProperties = {
    width: 'calc(100% - 25px)',
    marginRight: 1,
    height: 'auto',
  };

  /** 引用查询人材机 */
  const triggerButton = (
    <Button disabled={disabled}>
      <FileSearchOutlined />
    </Button>
  );

  return (
    <>
      <div className="form-item-custom">
        <InputNumber value={value} onChange={inputOnChange} style={inputStyle} disabled={disabled} />

        <DbMatBranchInsert
          dbMatMainTableProps={{
            rowSelection: { columnWidth: 40, revert: false, type: 'radio' },
            onCurrent: setCurrent,
          }}
          matMainDataSourceRequest={matMainQueryPageInfoNotExistsMat}
          classifyRjcTypePane={['rcj', 'machine', 'concrete']}
          primaryCurrent={{ id: '1' }}
          trigger={triggerButton}
          onSave={handleOnSave}
          okText="确 定"
        />
      </div>
      {contextHolder}
    </>
  );
};
