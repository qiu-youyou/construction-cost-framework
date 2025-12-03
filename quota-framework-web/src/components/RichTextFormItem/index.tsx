/*
 * @Author: SHUANG
 * @Date: 2022-09-06 19:02:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-20 17:22:10
 * @Description: 表单中富文本编辑器
 */
import { useEffect, useState } from 'react';
import { staticResourceUpload } from '../../common/services/system';
import { richTextControls } from './controls';
import BraftEditor from 'braft-editor';

// 引入编辑器样式
import 'braft-editor/dist/index.css';
export type Props = {
  id?: string;
  disable?: any;
  onChange?: (value?: string) => void; // contractCode contractItem
  richTextQuery: (params: any) => Promise<FETCH.Row<any>>;
};

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? '/api' : '/web/server';

export default (props: Props) => {
  const [value, setValue] = useState<string>(BraftEditor.createEditorState(null));

  const handleSetValue = (v: string | { toHTML: any }) => {
    setValue(BraftEditor.createEditorState(v));
    props?.onChange?.(typeof v === 'string' ? v : v?.toHTML());
  };

  const queryNewsOne = async () => {
    if (!props?.id) return;
    if (!props?.richTextQuery) return;
    const res = await props?.richTextQuery?.({ id: props.id });
    if (res?.status !== 'SUCCESS') return;
    const { rows } = res;
    handleSetValue(rows?.contentString || rows?.problemDesc || '');
  };

  const handleUploadHandler = async (params: any) => {
    if (!params?.file) return;
    const formData = new FormData();
    formData.append('file', params?.file);
    const res = await staticResourceUpload(formData);
    if (res?.status !== 'SUCCESS') {
      params.error(res?.message);
      return;
    }
    params.success({
      url: baseUrl + res?.rows,
      meta: {
        loop: true, // 指定音视频是否循环播放
        autoPlay: true, // 指定音视频是否自动播放
        controls: true, // 指定音视频是否显示控制栏
      },
    });
  };

  useEffect(() => {
    queryNewsOne();
  }, []);

  return (
    <div className="editor-wrapper">
      <BraftEditor
        controls={richTextControls}
        contentStyle={{
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)',
          fontSize: 12,
          height: 460,
        }}
        media={{ uploadFn: handleUploadHandler }}
        placeholder={props?.disable ? '' : '请输入内容'}
        onChange={handleSetValue}
        readOnly={props?.disable}
        contentFormat="html"
        value={value}
      />
    </div>
  );
};
