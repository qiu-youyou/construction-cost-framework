/*
 * @Author: SHUANG
 * @Date: 2023-10-17 18:06:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 10:00:39
 * @Description: 章节说明
 */
import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { ProFormTextArea } from '@ant-design/pro-components';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import UploadFileButton from 'jd-framework-web/package/components/ActionButton/UploadFileButton';

import { dbChapterExtQueryOne } from '../../DbChapterTree/services';
import { DataBaseProps } from '../../typings';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';

export default (props: DataBaseProps) => {
  /** 数据接收 */
  const { databaseCurrent, dbChapterCurrent } = props;

  /** loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 定额库 章节说明 */
  const [dataSource, setDataSource] = useState<string>('');

  /** 定额库 章节维护权限 */
  const chapterAccess = !!databaseCurrent?.access?.includes('chapter');

  /** 根据定额库及章节Id 查询当前章节说明 */
  const fetchDbChapterExtQueryOne = async () => {
    setLoading(true);
    const id = dbChapterCurrent?.id || '';
    const dbId = dbChapterCurrent?.dbId || '';
    const res = await dbChapterExtQueryOne({ dbId, id });
    setLoading(false);
    setDataSource(res?.rows?.chapterNode || ``);
  };

  /** 刷新 从文件加载按钮 */
  const DescActionButtons = (
    <Space size={3}>
      <Button className="PlusButton" onClick={fetchDbChapterExtQueryOne} loading={loading}>
        <ReloadOutlined /> 刷新
      </Button>

      {chapterAccess && (
        <UploadFileButton
          uploadParams={{
            beanName: 'reportWordServiceImpl',
            dbId: dbChapterCurrent?.dbId || '',
            cpId: dbChapterCurrent?.id || '',
            type: '2',
          }}
          onRefresh={fetchDbChapterExtQueryOne}
          onSubmit={attachmentUpload}
          buttonText="从文件中加载"
        />
      )}
    </Space>
  );

  /** 章节改变触发刷新 */
  useEffect(() => {
    if (!dbChapterCurrent?.id) setDataSource('');
    else fetchDbChapterExtQueryOne();
  }, [dbChapterCurrent?.id]);

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
