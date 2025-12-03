/*
 * @Author: SHUANG
 * @Date: 2022-10-20 17:19:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 16:00:41
 * @Description: 通知提及 @人员
 */

import { Mentions } from 'antd';
import { useCallback, useState } from 'react';
import { MentionsUsersListItem } from '../../process/ProcessHistory/typing';
import { sysNoticeUserSearch } from '../../views/system/User/services';
import debounce from 'lodash/debounce';

const { Option } = Mentions;

export type MentionsProps = {
  value?: string;
  onChange?: (value?: string) => void; // contractCode contractItem
};

export default (props: MentionsProps) => {
  const [loading, setLoading] = useState(false);
  const [mentionsUsers, setMentionsUsers] = useState<MentionsUsersListItem[]>();

  const getNoticeParams = (noticePerson: string) => {
    const persons = noticePerson?.split(',')?.map((item) => item.trim());
    if (persons?.[persons.length - 1] === '') {
      persons.pop();
    }
    return persons?.join(',');
  };

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

  const onMentionsChange = (noticePerson: string) => {
    const value = getNoticeParams(noticePerson);

    props.onChange?.(value);
  };

  return (
    <Mentions
      loading={loading}
      onSearch={onSearch}
      onChange={onMentionsChange}
      placeholder="@ 员工号、员工名字"
      style={{ width: '100%' }}
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
  );
};
