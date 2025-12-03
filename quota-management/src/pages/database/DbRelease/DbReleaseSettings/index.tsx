/*
 * @Author: SHUANG
 * @Date: 2023-11-20 17:01:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 08:58:56
 * @Description: 定额标准发布 定额输出参数设置
 */
import {
  DeliveredProcedureOutlined,
  InfoCircleOutlined,
  DownOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';
import { Button, Dropdown, Modal, Space, message } from 'antd';
import { ProFormInstance } from '@ant-design/pro-components';

import { BaseDropDownProps } from 'jd-framework-web/package/components/BaseDropDown';
import BaseSchemaForm from 'jd-framework-web/package/components/BaseSchemaForm';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseSchemaFormProps } from 'jd-framework-web/package/components';

import { DbChapterItem } from '../../DbMain/DatabaseMain/DbChapterTree/typings';
import useMainFormColumns from './useMainFormColumns';
import * as TYPES from './typings';
import * as API from './services';
import styles from './index.less';

type Props = {
  /** 当前章节 已勾选 KEYS */
  dbChapterCheckedKeys?: string[];
  /** 当前章节 已勾选 KEYS */
  dbChapterHalfCheckedKeys?: string[];
  /** 章节数据源 */
  dbChapterDataSource?: DbChapterItem[];
};

export default (props: Props) => {
  const { auth } = useAuthButton();

  const [modal, contextHolder] = Modal.useModal();

  /** 定额输出参数设置表单 */
  const mainFormRef = useRef<ProFormInstance>();
  const generatemainForm: BaseSchemaFormProps = {
    request: async () => {
      const res = await API.dbReleaseQueryOneSettings();
      setSettingsCurrent(res?.rows);
      return res?.rows || {};
    },
    columns: useMainFormColumns,
    disabled: !auth('edit'),
    wrapperCol: { span: 18 },
    colProps: { span: 12 },
    labelCol: { span: 6 },
    formRef: mainFormRef,
    layoutType: 'Form',
    submitter: false,
    grid: true,
    params: {},
  };

  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [settingsCurrent, setSettingsCurrent] = useState<TYPES.DbReleaseSettingsItem>();
  const { dbChapterCheckedKeys, dbChapterHalfCheckedKeys } = props;

  /** 保存方法 */
  const handleSaveOnSubmit = async () => {
    /** 校验表单 */
    const mainFormValues = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();
    const id = settingsCurrent?.id || '';
    setSaveLoading(true);
    const res = await API.dbReleaseSaveSettings({ ...mainFormValues, id });
    setSaveLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
    }
  };

  // 递归函数，用于构建保存参数
  const traverseAndSave = (node: any) => {
    const isChecked = dbChapterCheckedKeys?.includes(node.id);
    const isHalfChecked = dbChapterHalfCheckedKeys?.includes(node.id);

    let saveObject: any = { id: String(node.id) };

    if (isChecked || isHalfChecked) {
      saveObject.children = node?.children
        ? node.children.map((child: any) => traverseAndSave(child)).filter(Boolean) // Filter out undefined
        : [];
    }

    if (isChecked || isHalfChecked) {
      return saveObject;
    }

    return undefined;
  };

  /** 输出方法 */
  const handleExportOnSubmit = async (key: string) => {
    const { dbChapterCheckedKeys, dbChapterDataSource } = props;

    if (!dbChapterCheckedKeys?.length) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请勾选章节！',
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }

    /** 携带输出参数 */
    const mainFormValues = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();

    setExportLoading(true);

    // 遍历整个树形结构，开始构建保存参数
    let saveParams: any = [];
    saveParams = dbChapterDataSource?.map((rootNode) => traverseAndSave(rootNode)).filter(Boolean); // Filter out undefined

    const jsonStr = JSON.stringify({
      id: dbChapterDataSource?.[0]?.dbId,
      children: saveParams,
    });

    let res: any;
    if (key === 'excel') res = await API.dbReleaseExportExcel({ jsonStr, ...mainFormValues });
    else res = await API.dbReleaseExportPdf({ jsonStr, ...mainFormValues });
    const filename = res?.response?.headers?.get('content-disposition')?.split('=')?.[1] || '';
    if (res?.data) {
      const blob = new Blob([res?.data]);
      const url = window.URL.createObjectURL(blob);
      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = url;
      aLink.download = decodeURI(filename);
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    }
    setExportLoading(false);
  };

  /** 按钮DOM */
  const DropdownMenu: BaseDropDownProps['menu'] = {
    onClick: ({ key }) => handleExportOnSubmit(key),
    items: [
      {
        key: 'excel',
        label: (
          <Button disabled={exportLoading} type="link">
            输出为EXCEL
          </Button>
        ),
      },
      {
        key: 'pdf',
        label: (
          <Button disabled={exportLoading} type="link">
            输出PDF
          </Button>
        ),
      },
    ],
  };

  return (
    <>
      <section className={styles.dbRelaeaseSettingsWrapper}>
        <section className={styles.dbRelaeaseSettingsBtns}>
          <Space>
            {auth('edit') && (
              <Button type="primary" loading={saveLoading} onClick={handleSaveOnSubmit}>
                <SaveOutlined /> 保存设置
              </Button>
            )}

            {auth('export') && (
              <Dropdown menu={DropdownMenu}>
                <Button className="EditButton" loading={exportLoading}>
                  <DeliveredProcedureOutlined /> 输出 <DownOutlined />
                </Button>
              </Dropdown>
            )}
          </Space>
        </section>

        <BaseSchemaForm {...generatemainForm} />
      </section>
      {contextHolder}
    </>
  );
};
