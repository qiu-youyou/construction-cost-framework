/*
 * @Author: SHUANG
 * @Date: 2022-10-20 17:19:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:36:21
 * @Description: 通知提及
 */
import { Mentions } from 'antd';
import { CSSProperties, useCallback, useImperativeHandle, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import debounce from 'lodash/debounce';

import { sysNoticeUserSearch } from '../../views/system/User/services';

const { Option } = Mentions;

/** 标签样式 */
const labelStyle: CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'top',
  marginRight: 10,
  width: 55,
};

export type MentionsProps = {
  personLabel?: string; // 表单显示文字
  contentLabel?: string; // 表单显示文字
  actionRef: {
    current: any;
    getNoticeParams?: () => { noticePerson: string; noticeContent: string };
  };
};

export default (props: MentionsProps) => {
  const [loading, setLoading] = useState(false);
  const [mentionsUsers, setMentionsUsers] = useState<{ userName: string; userRealname: string }[]>();

  const [noticePerson, setNoticePerson] = useState<string>();
  const [noticeContent, setNoticeContent] = useState<string>();

  /** Action Ref */
  const initUseImperativeHandle = () => ({
    getNoticeParams: () => {
      const persons = noticePerson?.split(',')?.map((item) => item.trim());
      if (persons?.[persons.length - 1] === '') {
        persons.pop();
      }
      return { noticePerson: persons?.join(','), noticeContent };
    },
  });
  useImperativeHandle(props?.actionRef, initUseImperativeHandle);

  const loadMentionsUsers = async (key: string) => {
    if (!key) {
      setMentionsUsers([]);
      return;
    }
    const res = await sysNoticeUserSearch(key);
    setLoading(false);
    setMentionsUsers(res?.rows);
  };

  const debounceLoadMentionsUsers = useCallback(debounce(loadMentionsUsers, 800), []);

  const onSearch = (search: string) => {
    setLoading(!!search);
    setMentionsUsers([]);
    debounceLoadMentionsUsers(search);
  };

  const onMentionsChange = (v: string) => {
    setNoticePerson(v);
  };

  const onContentChange = (e: any) => {
    setNoticeContent(e?.target?.value);
  };

  return (
    <>
      <div style={{ padding: '10px 20px' }}>
        <span style={labelStyle}>{props?.personLabel || '通知人'}:</span>
        <Mentions
          loading={loading}
          onSearch={onSearch}
          onChange={onMentionsChange}
          placeholder="@ 员工号、员工名字"
          style={{ width: '75%' }}
          autoSize
        >
          {mentionsUsers?.map(({ userName, userRealname }, index) => (
            <Option
              key={index + ''}
              value={userName + ':' + userRealname + ','}
              className="antd-demo-dynamic-option"
            >
              <span>{userName + ':' + userRealname}</span>
            </Option>
          ))}
        </Mentions>
      </div>

      <div style={{ padding: '10px 20px' }}>
        <span style={labelStyle}>{props?.contentLabel || '通知内容'}:</span>
        <TextArea
          rows={7}
          placeholder="请输入"
          style={{ width: '85%', display: 'inline-block' }}
          onChange={onContentChange}
          showCount
        />
      </div>
    </>
  );
};
