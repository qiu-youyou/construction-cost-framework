/*
 * @Author: SHUANG
 * @Date: 2023-05-04 16:52:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-11 11:31:23
 * @Description:
 */
import { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-form';

import { BaseSchemaFormProps } from '../../../../../components/BaseSchemaForm/typings';
import SpaceView from '../../../../../components/ViewContainer/SpaceView';
import BaseSchemaForm from '../../../../../components/BaseSchemaForm';
import BaseCard from '../../../../../components/BaseCard';

import { LAYOUTCOL } from '../../../../constant/layoutCol';
import AnnexTable from '../../../../annex/AnnexTable';

import useMainFormColumns from './useMainFormColumns';
import { sysNewsSave } from '../services';
import * as TYPES from '../typings';
import style from './index.less';

type porpsDefine = {
  formType?: SYS.FormType;
  announcementCurrent?: TYPES.BulletinListItem;
  reload?: () => void; // 保存成功时触发的函数
};

export default (props: porpsDefine) => {
  const { announcementCurrent } = props;
  const [announcementCurrentId, setBulletinCurrentId] = useState<string>(props.announcementCurrent?.id || '');
  const [saveLoading, setSaveLoading] = useState<boolean>();

  /** 主单据 */
  const mainFormRef = useRef<ProFormInstance>();
  const generateMainForm: BaseSchemaFormProps = {
    columns: useMainFormColumns(props.formType),
    shouldUpdate: (newValues, oldValues) => {
      if (newValues.newsType !== oldValues?.newsType) return true;
      else return false;
    },
    initialValues: announcementCurrent || { newsType: 'PUBLIC' },
    ...LAYOUTCOL.largeLayout,
    formRef: mainFormRef,
    submitter: false,
    grid: true,
  };

  /** 点击保存 */
  const onClickSave = async () => {
    try {
      const values = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();
      delete values.createMan;
      delete values.createDatetime;
      delete values.lastUpdateUserName;
      delete values.lastUpdateTime;
      setSaveLoading(true);
      const res = await sysNewsSave({
        ...values,
        id: announcementCurrentId,
        workBillCode: values?.workBillCode,
      });
      setSaveLoading(false);
      if (res?.status !== 'SUCCESS') return;
      message.success(res?.message);
      res.rows.content = res.rows.contentString;
      setBulletinCurrentId(res?.rows?.id);
      mainFormRef?.current?.setFieldsValue(res?.rows);
      props?.reload?.();
    } catch (error) {}
  };

  const submiterButton = [
    <Button key="save" type="primary" loading={saveLoading} onClick={onClickSave}>
      <SaveOutlined /> 保存
    </Button>,
  ];

  return (
    <section className={style.richTextSection} style={{ height: 480 }}>
      <SpaceView style={{ padding: '2px 6px 4px 6px' }}>
        <>{!!props?.formType && submiterButton}</>
      </SpaceView>

      <SpaceView style={{ height: 'max-content' }}>
        <BaseCard bordered type="H2" title="公告">
          <BaseSchemaForm {...generateMainForm} />
        </BaseCard>
      </SpaceView>

      <SpaceView disable={!announcementCurrentId}>
        <BaseCard bordered type="H2" title="附件">
          <AnnexTable deleted={!!props.formType} businessId={announcementCurrentId} />
        </BaseCard>
      </SpaceView>
    </section>
  );
};
