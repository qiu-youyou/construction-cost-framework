/*
 * @Author: SHUANG
 * @Date: 2024-01-31 16:39:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 11:05:32
 * @Description: 查询项目库 选择/输入 项目信息
 */
import { Button, Input, Modal } from 'antd';
import { CSSProperties, useRef, useState } from 'react';
import { CloseCircleFilled, FileSearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import BaseModal from 'jd-framework-web/package/components/BaseModal';

import { dataswapQueryCBXXProject } from '@/common/services/dataswap';

import useTableColumns from '@/pages/dbapply/Product/Project/useTableColumns';
import { ProjectItem } from '@/pages/dbapply/Product/Project/typings';

type Props = {
  // formItem 默认当前值
  value?: string;
  // formItem 默认事件
  onChange?: (value?: string, projectCurrent?: ProjectItem) => void;
  // 项目ID
  projectId?: string;
};

export default (props: Props) => {
  /** PROPS */
  const { value, onChange, projectId } = props;

  /** useModal */
  const [modal, contextHolder] = Modal.useModal();

  /** ref 项目列表引用 */
  const projectTableRef = useRef<TableActionType>();

  /** 当前选择项目 */
  const [projectCurrent, setProjectCurrent] = useState<ProjectItem>();

  const handleProjectList = (rows: ProjectItem[]) => {
    if (!rows) return [];
    return rows.map((item) => {
      // 项目负责人、项目审查人
      const userInformationFz = item?.projectLeaderPerson;
      const userInformationSc = item?.projectCheckPerson;

      const projectLeaderPerson =
        userInformationFz &&
        JSON.parse(userInformationFz)
          ?.map((item: any) => item?.userFullName)
          .join(',');

      const projectCheckPerson =
        userInformationSc &&
        JSON.parse(userInformationSc)
          ?.map((item: any) => item?.userFullName)
          .join(',');

      // 项目特征
      const featureInformation = item?.feature && JSON.parse(item?.feature);
      const feature = featureInformation
        ?.map((item: any) => `${item?.featureText || ''}：${item?.itemText || ''}${item?.unitText || ''}`)
        .join('，');

      return {
        ...item,
        userInformationFz,
        userInformationSc,
        projectLeaderPerson,
        projectCheckPerson,
        featureInformation,
        feature,
      };
    });
  };

  /** 获取项目列表数据 获取完成后 根据 id 设置当前行 */
  const fetchProductProjectQueryPageInfo = async (params: FETCH.Req) => {
    const res = await dataswapQueryCBXXProject(params);

    // 处理回显结构
    const rows = handleProjectList(res?.rows as ProjectItem[]);

    // 查找当前项目
    if (!projectId) return { ...res, rows };
    const index: any = rows?.findIndex((item: any) => item?.id === projectId);
    if (index !== -1) {
      projectTableRef?.current?.setTableCurrent?.(rows?.[index]);
      projectTableRef?.current?.tableScrollTo?.(index);
    }

    return { ...res, rows };
  };

  /** 项目列表 引用 */
  const generateTable: BaseTableProps = {
    persistenceKey: 'COMMON_FORMITEMS_PROJECTSEARCHTABLE',
    columns: useTableColumns?.filter((item) => item.dataIndex !== 'billStatus'),
    service: { dataSourceRequest: fetchProductProjectQueryPageInfo },
    rowSelection: { type: 'radio' },
    onCurrent: setProjectCurrent,
    actionRef: projectTableRef,
  };

  /** 保存输入的项目名称 */
  const inputOnChange = (e: any) => onChange?.(e.target.value);

  /** 保存已选的项目信息 */
  const handleOnSubmit = async () => {
    if (!projectCurrent) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请选择项目！再进行该操作！',
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return { status: 'ERROR' };
    }
    onChange?.(projectCurrent?.projectName, projectCurrent);
    return { status: 'SUCCESS' };
  };

  /** 清空INPUT */
  const handleClearInput = () => {
    onChange?.('');
  };

  /** 触发按钮 */
  const TriggerButton = (
    <Button className="BorderButtonPrimary">
      <FileSearchOutlined /> 查询项目库
    </Button>
  );

  /** 清空图标样式 */
  const clearIconStyle: CSSProperties = {
    right: 100,
  };

  /** 文本样式 */
  const inputStyle: CSSProperties = {
    width: 'calc(100% - 91px)',
    marginRight: 3,
    height: 'auto',
  };

  return (
    <>
      <div className="form-item-custom">
        <Input.TextArea value={value} onChange={inputOnChange} style={inputStyle} rows={1} />

        {!!value && (
          <span style={clearIconStyle} className="ClearInputButton" onClick={handleClearInput}>
            <CloseCircleFilled />
          </span>
        )}

        <BaseModal
          width={1200}
          title="选择项目"
          style={{ top: 110 }}
          trigger={TriggerButton}
          onSubmit={handleOnSubmit}
        >
          <section style={{ height: 420 }}>
            <BaseTable {...generateTable} />
          </section>
        </BaseModal>
      </div>
      {contextHolder}
    </>
  );
};
