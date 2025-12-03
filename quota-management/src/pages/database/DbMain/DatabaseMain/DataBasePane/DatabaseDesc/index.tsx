/*
 * @Author: SHUANG
 * @Date: 2023-10-17 18:06:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-13 16:11:44
 * @Description: 册编制说明
 */
import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { ProFormTextArea } from '@ant-design/pro-components';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import UploadFileButton from 'jd-framework-web/package/components/ActionButton/UploadFileButton';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';

import { databaseDbExtQueryOne } from '../../services';
import { DataBaseProps } from '../../typings';

export default (props: DataBaseProps) => {
  /** 数据接收 */
  const { databaseCurrent } = props;
  /** 当前数据库ID */
  const dbId = databaseCurrent?.id || '';

  /** loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 册编制说明 */
  const [dataSource, setDataSource] = useState<string>('');

  /** 定额库 是否有编辑权限 */
  const dbnoteAccess = !!databaseCurrent?.access?.includes('dbnote');

  /** 根据定额库Id 查询当前定额库说明 */
  const fetchDatabaseDbExtQueryOne = async () => {
    setLoading(true);
    const res = await databaseDbExtQueryOne({ id: databaseCurrent?.id || '' });
    setLoading(false);
    setDataSource(res?.rows?.dbChapterExt || ``);
  };

  /** 刷新 从文件加载按钮 */
  const DescActionButtons = (
    <Space size={3}>
      <Button className="PlusButton" onClick={fetchDatabaseDbExtQueryOne} loading={loading}>
        <ReloadOutlined /> 刷新
      </Button>

      {dbnoteAccess && (
        <UploadFileButton
          params={{ beanName: 'reportWordServiceImpl', type: '1', dbId }}
          onRefresh={fetchDatabaseDbExtQueryOne}
          onSubmit={attachmentUpload}
          buttonText="从文件中加载"
          accept=".doc,.docx"
        />
      )}
    </Space>
  );

  /** 定额库改变触发刷新 */
  useEffect(() => {
    if (!databaseCurrent?.id) setDataSource('');
    else fetchDatabaseDbExtQueryOne();
  }, [databaseCurrent?.id]);

  return (
    <BaseCard title={DescActionButtons} extraFullScreen={false}>
      <section className="resetDescTextAreaSection">
        <ProFormTextArea
          fieldProps={{ value: dataSource, showCount: true, autoSize: true }}
          placeholder=" "
          disabled
        />
      </section>
    </BaseCard>
  );
};
