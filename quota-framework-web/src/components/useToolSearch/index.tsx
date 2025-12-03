import { DeleteTwoTone } from '@ant-design/icons';
import { ReactNode, useState } from 'react';

/** 本地搜索历史 Local search history */

/** useToolSearch */
type OptionsType = { label: ReactNode; options: any };
export default (localKey: string) => {
  /** state */
  const [options, setOptions] = useState<OptionsType[]>([]);

  /** 取 take */
  const getSearchLocal = () => {
    const searchLocal = localStorage.getItem(localKey);
    return (searchLocal && JSON.parse(searchLocal)) || [];
  };

  /** 存 save */
  const setSearchLocal = (v: string[]) => {
    /** 历史记录如果超过十条 删除第一条  */
    if (v && v?.length > 10) {
      v.splice(0, 1);
    }
    localStorage.setItem(localKey, JSON.stringify(v));
  };

  /** 删除被点击的历史记录 并重新生成历史列表
   * Delete the clicked history and regenerate the history list */
  const onClickClearItem = (e: any, index: number, list: string[]) => {
    e.stopPropagation();
    if (!list.length) return;
    const listSource = [...list];
    listSource.splice(index, 1);
    setSearchLocal(listSource);

    getSearchOptions();
  };

  /** 清空所有历史记录 Clear all history */
  const onClickClearAll = (e: any) => {
    setSearchLocal([]);

    getSearchOptions();
  };

  /** 自定义渲染标题  Custom render title */
  const renderTitle = (title: ReactNode) => (
    <span>
      {title}
      <a onClick={(e) => onClickClearAll(e)}>清空</a>
    </span>
  );

  /** 渲染历史记录每一项 Each render history */
  const renderItem = (list: string[]) => {
    const res: {}[] = [];
    /** 根据当前历史记录 生成列表
     * Generate list based on current history */
    list.forEach((item, index) => {
      res.push({
        value: item,
        label: (
          <div key={index}>
            {item}
            <a>
              <DeleteTwoTone onClick={(e) => onClickClearItem(e, index, list)} />
            </a>
          </div>
        ),
      });
    });
    return res;
  };

  /** 获取历史记录列表 Get history list */
  const getSearchOptions = () => {
    const searchLocal = getSearchLocal();
    if (!searchLocal.length) setOptions([]);
    else
      setOptions([
        {
          label: renderTitle('搜索历史'),
          options: renderItem(searchLocal),
        },
      ]);
  };

  /** 设置历史记录列表 Set history list  */
  const setSearchOptions = (text: string) => {
    if (text === '') return;
    const value = text.trim();
    const searchLocal = getSearchLocal();
    if (searchLocal.includes(value)) return;
    setSearchLocal([...searchLocal, value]);
  };

  return {
    options,
    getSearchOptions,
    setSearchOptions,
  };
};
