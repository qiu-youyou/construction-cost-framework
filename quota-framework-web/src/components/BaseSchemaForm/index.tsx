/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-02 11:56:53
 * @Description: 基础表单
 */
import { isEqual, throttle } from 'lodash';
import { Button, Space } from 'antd';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { BetaSchemaForm } from '@ant-design/pro-form';

import { LAYOUTCOL } from '../../common/constant/layoutCol';
import useColumns from './useColumns';

type Props = <T, ValueType = 'text'>(props: FormSchema<T, ValueType>) => JSX.Element;

const BaseSchemaForm: Props = (props) => {
  const copyProps = { ...props };

  const { columns } = useColumns(props);
  const baseSchemaFormRef = useRef<any>();
  const [colPropsSpan, setColPropsSpan] = useState<number>();

  /** 提交配置 */
  const SubmitterMap: FormSchema['submitter'] = {
    render: (props: any, defaultDoms: ReactNode[]) => {
      if (copyProps?.steps) {
        if (copyProps?.steps?.length === props?.step + 1) {
          // 最后一步
          return (
            <div className="SchemaFormFooter">
              <Space>
                <Button key="rest" onClick={() => props.form?.resetFields()}>
                  重置
                </Button>
                {defaultDoms[0]}
                <Button
                  type="primary"
                  key="submit"
                  loading={props?.submitButtonProps?.loading}
                  onClick={() => props.form?.submit?.()}
                >
                  确认
                </Button>
              </Space>
            </div>
          );
        }
        if (copyProps?.steps?.length > props?.step + 1) {
          return (
            <div className="SchemaFormFooter">
              <Space>
                <Button key="rest" onClick={() => props.form?.resetFields()}>
                  重置
                </Button>
                {defaultDoms}
              </Space>
            </div>
          );
        }
      }

      return (
        <div className="SchemaFormFooter">
          <Space>
            <Button key="rest" onClick={() => props.form?.resetFields()}>
              重置
            </Button>
            <Button
              type="primary"
              key="submit"
              loading={props?.submitButtonProps?.loading}
              onClick={() => props.form?.submit?.()}
            >
              确认
            </Button>
          </Space>
        </div>
      );
    },
  };

  useEffect(() => {
    const handleResize = throttle((entries) => {
      const areObjectsEqual = isEqual(copyProps?.colProps, LAYOUTCOL.defaultLayout.colProps);
      if (!areObjectsEqual) return;
      // 如果使用了默认 cols
      for (const entry of entries) {
        if (baseSchemaFormRef.current === entry.target) {
          const width = entry.contentRect.width;
          if (width >= 1600) {
            setColPropsSpan(6);
          } else if (width >= 1200) {
            setColPropsSpan(6);
          } else if (width >= 992) {
            setColPropsSpan(8);
          } else if (width >= 768) {
            setColPropsSpan(12);
          } else if (width >= 576) {
            setColPropsSpan(24);
          } else {
            setColPropsSpan(24);
          }
        }
      }
    }, 300); // 500毫秒的节流

    const resizeObserver = new ResizeObserver(handleResize);

    if (baseSchemaFormRef.current) {
      resizeObserver.observe(baseSchemaFormRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  // 这里的空数组表示仅在组件挂载和卸载时执行 useEffect

  const colProps = !!colPropsSpan ? { colProps: { span: colPropsSpan } } : {};

  /** schemaForm */
  const BetaSchemaFormRender = (
    <BetaSchemaForm
      layout="horizontal"
      submitter={SubmitterMap}
      formRef={baseSchemaFormRef}
      autoFocusFirstInput={false}
      wrapperCol={{ span: 14 }}
      labelCol={{ span: 7 }}
      shouldUpdate={false}
      {...copyProps}
      {...colProps}
      columns={columns}
      className={'noExplainAntForm' + ' ' + props?.className}
    />
  );
  // autoComplete="on"

  return <div ref={baseSchemaFormRef}>{BetaSchemaFormRender}</div>;
};

export default BaseSchemaForm;
