/*
 * @Author: SHUANG
 * @Date: 2024-02-28 16:42:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 15:43:52
 * @Description: EXCEL 高级导入 选择结构范围
 */
import { CSSProperties } from 'react';
import { Checkbox, Col, Row, Typography } from 'antd';
import { ExcelUploadProPropsContent, StructuralScopeItem } from '../typings';

const testOptionsData = [
  {
    value: '1',
    label: '费用汇总',
    children: [
      { value: '1.1', label: '单位工程费汇总' },
      { value: '1.2', label: '规费税金' },
    ],
  },
  {
    value: '2',
    label: '分部分项',
    children: [{ value: '2.1', label: '分部分项清单' }],
  },
  {
    value: '3',
    label: '措施项目',
    children: [
      { value: '3.1', label: '总价措施' },
      { value: '3.2', label: '单价措施' },
    ],
  },
  {
    value: '4',
    label: '其他项目',
    children: [
      { value: '4.1', label: '其他项目' },
      { value: '4.2', label: '暂列金额' },
      { value: '4.3', label: '专业工程暂估价' },
      { value: '4.4', label: '材料暂估价' },
      { value: '4.5', label: '总承包服务费' },
      { value: '4.6', label: '计日工' },
    ],
  },
  {
    value: '5',
    label: '人材机',
    children: [
      { value: '5.1', label: '主要材料' },
      { value: '5.2', label: '甲供材料' },
      { value: '5.3', label: '人材机汇总' },
    ],
  },
];

export default (props: ExcelUploadProPropsContent) => {
  /** 当前选择的导入范围 */
  const { structuralScopeSelect, setStructuralScopeSelect } = props;

  /** 改变选中的结构范围 */
  const handleCheckboxOnChange = (checked: boolean, option: StructuralScopeItem) => {
    // 新增选中
    if (checked) {
      setStructuralScopeSelect?.((v) => [...(v || []), option]);
    } else {
      // 在 structuralScopeSelect 中找到并移除这项
      const newStructuralScopeSelect = structuralScopeSelect?.filter((item) => item.value != option.value);
      setStructuralScopeSelect?.(newStructuralScopeSelect);
    }
  };

  /** section style */
  const sectionStyle: CSSProperties = {
    margin: '20px auto 60px auto',
    padding: 10,
    width: 900,
  };

  return (
    <section style={sectionStyle}>
      <Typography.Title level={5} style={{ marginBottom: 18 }}>
        选择导入范围
      </Typography.Title>

      <section style={{ border: '1px solid #d7d7d7', padding: '10px 15px' }}>
        {testOptionsData?.map((item) => {
          return (
            <div key={item.value} style={{ marginTop: 10 }}>
              <Row>
                <Col span={2}>
                  <h4 style={{ fontSize: 13 }}>{item.label}</h4>
                </Col>
                <Col span={22}>
                  {item?.children.map((chil) => {
                    return (
                      <Checkbox
                        checked={!!structuralScopeSelect?.find((v) => v.value == chil.value)?.value}
                        onChange={(e) => handleCheckboxOnChange(e.target.checked, chil)}
                      >
                        {chil.label}
                      </Checkbox>
                    );
                  })}
                </Col>
              </Row>
            </div>
          );
        })}
      </section>
    </section>
  );
};
