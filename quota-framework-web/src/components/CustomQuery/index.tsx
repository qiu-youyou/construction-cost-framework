/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-19 18:18:25
 * @Description:
 */
import { useState } from 'react';
import { FileSearchOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Input, InputNumber, message, Select, Space } from 'antd';

/** from components */
import { QueryConditionItemType, QueryFieldItemType } from './typings';
import { customQueryFlied, customQueryModel } from './services';
import BaseModal from '../BaseModal';
import styles from './index.less';

const { Option } = Select;

/** {select:是否勾选, fieldName:’字段名称’, value:’字段值’, condition:’条件’, keyword:’关系’,numberRate:’系数’}
 * select:[true、false]
 * condition:[=、!=、>、<、>=、<=、like、notlike]
 * keyword:[and、or]
 */

/** 查询条件 定义 */
const conditionFlie = [
  { condition: '=', conditionEn: '等于' },
  { condition: '!=', conditionEn: '不等于' },
  { condition: '>', conditionEn: '大于' },
  { condition: '<', conditionEn: '小于' },
  { condition: '>=', conditionEn: '大于等于' },
  { condition: '<=', conditionEn: '小于等于' },
  { condition: 'like', conditionEn: '包含' },
  { condition: 'notlike', conditionEn: '不包含' },
];

/** 每一行查询模型定义 */
const queryConditionItem: QueryConditionItemType = {
  select: true,
  fieldName: '',
  value: '',
  condition: '=',
  keyword: 'and',
  numberRate: 0,
  filedType: 'String',
};

type Props = {
  customKey?: string;
  customSearch: (v: { customKey?: string; customQuery?: string }) => void;
};
export default (props: Props) => {
  if (!props?.customKey) return <></>;

  /** 查询数组 */
  const [queryConditionComs, setQueryConditionComs] = useState<QueryConditionItemType[]>([
    {
      select: true,
      fieldName: '',
      value: '',
      condition: '=',
      keyword: 'and',
      numberRate: 0,
      filedType: 'String',
    },
  ]);

  /** 查询字段 */
  const [queryFlied, setQueryFlied] = useState<QueryFieldItemType[]>();

  /** 增加一行 */
  const onClickInsertItem = (idx: number) => {
    const item: QueryConditionItemType = {
      select: true,
      fieldName: queryFlied?.[0]?.filedName,
      value: '',
      condition: 'like',
      keyword: 'and',
      numberRate: queryFlied?.[0]?.filedNumberRate,
      filedType: 'String',
    };
    const queryConditionComsSource = [...queryConditionComs];
    queryConditionComsSource.splice(idx + 1, 0, item);
    setQueryConditionComs(queryConditionComsSource);
  };

  const onClickRemoveItem = (idx: number) => {
    const queryConditionComsSource = [...queryConditionComs];
    queryConditionComsSource.splice(idx, 1);
    setQueryConditionComs(queryConditionComsSource);
  };

  /** 当值发生改变 */
  const whenValueChange = (key: string, value: any, index: number) => {
    const queryConditionComsSource: any = [...queryConditionComs];
    queryConditionComsSource[index][key] = value;
    if (key === 'fieldName') {
      const findItem = queryFlied?.find((item) => item.filedName === value);
      queryConditionComsSource[index].filedType = findItem ? findItem.filedType : 'String';
      queryConditionComsSource[index].numberRate = findItem ? findItem.filedNumberRate : 0;
    }
    setQueryConditionComs(queryConditionComsSource);
  };

  /** 查询字段 */
  const queryDefaultCustomQueryFlied = async () => {
    const res = await customQueryFlied({ customKey: props?.customKey });
    setQueryFlied(res?.rows);
  };

  /** 查询模板 */
  const queryDefaultCustomQueryModel = async () => {
    const res = await customQueryModel({ customKey: props?.customKey });
    if (!res?.rows.queryCondition || res?.rows.queryCondition === '[]') {
      setQueryConditionComs([
        {
          select: true,
          fieldName: queryFlied?.[0]?.filedName,
          value: '',
          condition: 'like',
          keyword: 'and',
          numberRate: queryFlied?.[0]?.filedNumberRate,
          filedType: 'String',
        },
      ]);
      return;
    }
    const queryCondition = JSON.parse(res?.rows?.queryCondition);
    setQueryConditionComs(queryCondition);
  };

  /** 提交查询 */
  const onSubmit: any = async () => {
    const noQuery = queryConditionComs.filter((item) => !item.fieldName);
    if (noQuery.length === queryConditionComs.length) {
      message.warning('请填写查询条件!');
      return { status: 'Error' };
    }
    /** 自定义查询参数 */
    const customKey = props.customKey;
    const customQuery = JSON.stringify(queryConditionComs);
    props.customSearch({ customKey, customQuery });
    return { status: 'SUCCESS' };
  };

  const handleClickCustom = () => {
    queryDefaultCustomQueryFlied();
    queryDefaultCustomQueryModel();
  };

  const trigger = (
    <Button key="senior" type="primary" onClick={handleClickCustom}>
      <FileSearchOutlined /> 高级查询
    </Button>
  );

  return (
    <BaseModal width={740} okText="查询" title="高级查询" trigger={trigger} onSubmit={onSubmit}>
      <section className={styles.customQuery}>
        {queryConditionComs.map((item, index) => {
          return (
            <Space key={index} size={12} style={{ marginBottom: 8 }}>
              <Checkbox
                checked={item.select}
                onChange={(e) => whenValueChange('select', e.target.checked, index)}
              />

              <Select
                value={item.fieldName}
                placeholder="检索标题"
                style={{ width: 180 }}
                onChange={(value) => whenValueChange('fieldName', value, index)}
                showSearch
              >
                {queryFlied?.map((item, index) => (
                  <Option key={index} value={item.filedName}>
                    {item.filedNameEn}
                  </Option>
                ))}
              </Select>

              <Select
                value={item.condition}
                placeholder="检索条件"
                style={{ width: 110 }}
                onChange={(value) => whenValueChange('condition', value, index)}
                showSearch
              >
                {conditionFlie.map((item, index) => (
                  <Option key={index} value={item.condition}>
                    {item.conditionEn}
                  </Option>
                ))}
              </Select>

              {item.filedType === 'Number' ? (
                <InputNumber
                  value={item.value}
                  placeholder="检索值"
                  onChange={(value) => whenValueChange('value', value, index)}
                  style={{ width: 180 }}
                />
              ) : item.filedType === 'Date' ? (
                <DatePicker onChange={(_, value) => whenValueChange('value', value, index)} />
              ) : (
                <Input
                  value={item.value}
                  placeholder="检索值"
                  onChange={(e) => whenValueChange('value', e.target.value, index)}
                  width={220}
                  allowClear
                />
              )}

              <Select
                value={item.keyword}
                placeholder="检索关系"
                style={{ width: 90 }}
                onChange={(value) => whenValueChange('keyword', value, index)}
              >
                <Option value="and">并且</Option>
                <Option value="or">或者</Option>
              </Select>

              <span>
                <Button
                  shape="circle"
                  icon={<PlusCircleOutlined />}
                  onClick={() => onClickInsertItem(index)}
                />
                {queryConditionComs?.length > 1 && (
                  <Button
                    shape="circle"
                    icon={
                      <MinusCircleOutlined
                        style={{ color: '#ccc' }}
                        onClick={() => onClickRemoveItem(index)}
                      />
                    }
                  />
                )}
              </span>
            </Space>
          );
        })}
      </section>
    </BaseModal>
  );
};
