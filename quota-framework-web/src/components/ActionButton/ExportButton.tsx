/*
 * @Author: LU
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:47:45
 * @Description: 导出按钮
 */
import { useState } from 'react';
import { Button, Dropdown, Modal } from 'antd';
import { CloudDownloadOutlined, DownOutlined } from '@ant-design/icons';

/** from components */
import { BaseDropDownProps } from '../BaseDropDown';
import { ActionButtonProps } from './typings';
import { TableToolbarDefine } from '../BaseTable/typings';

const defaultProps: ActionButtonProps & TableToolbarDefine['export'] = {
  buttonText: '导出',
  exportType: 'option',
};

/** 导出全部是增加参数exportAll=Y */

const ExportButton = (prop: ActionButtonProps) => {
  // 加载中变量
  const [loading, setLoading] = useState<boolean>(false);
  const props = { ...defaultProps, ...prop };

  const [modal, contextHolder] = Modal.useModal();

  const handleDown = async (res: any) => {
    const filename = res?.response?.headers?.get('content-disposition')?.split('=')?.[1];

    if (res?.data) {
      const blob = new Blob([res.data]);
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
  };

  const operateExport = async (exportAll?: string) => {
    if (!props.onSubmit) return false;

    /** 不做是否包含当前行的判断 */
    if (typeof props?.determineActionCurrent === 'function') {
      /** 没有可操作行 */
      if (!props?.current) {
        modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
        return;
      }
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    /** 删除多余的检索key */
    try {
      props
        .onSubmit({
          ...props.tableSearchParams,
          ...props?.pageParams,
          ...props?.exportParams,
          exportAll,
        })
        .then((res: any) => handleDown(res));
    } catch (err) {}

    return;
  };

  const handleItemOnSubmit = async (itemOnSubmit?: ActionButtonProps['onSubmit'], exportAll?: string) => {
    if (!itemOnSubmit) return false;

    /** 不做是否包含当前行的判断 */
    if (typeof props?.determineActionCurrent === 'function') {
      /** 没有可操作行 */
      if (!props?.current) {
        modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
        return;
      }
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 1000);

    /** 删除多余的检索key */
    try {
      itemOnSubmit({
        ...props.tableSearchParams,
        ...props?.pageParams,
        ...props?.exportParams,
        exportAll,
      }).then((res: any) => handleDown(res));
    } catch (err) {}

    return;
  };

  /** 按钮DOM */
  const buttonDomLevelSet: BaseDropDownProps['menu'] = {
    onClick: ({ key }) => operateExport(key),
    items: [
      { key: 'N', label: <Button type="link">导出当页</Button> },
      { key: 'Y', label: <Button type="link">导出全部</Button> },
    ],
  };

  /** 重写 */
  const buttonDomLevelSetByProps: BaseDropDownProps['menu'] = props?.options && {
    onClick: (item) => {
      props?.options?.onClick?.(item, handleDown);
      const findItem = props?.options?.items?.find((i) => i.key === item.key);
      handleItemOnSubmit(findItem?.onSubmit);
    },
    items: props?.options?.items,
  };

  return (
    <>
      {props.exportType === 'option' ? (
        <Dropdown disabled={props.disabled} menu={buttonDomLevelSetByProps || buttonDomLevelSet}>
          <Button className="ExportButton" disabled={props.disabled} loading={loading}>
            <CloudDownloadOutlined />
            {props.buttonText}
            <DownOutlined />
          </Button>
        </Dropdown>
      ) : (
        <Button
          className="ExportButton"
          disabled={props.disabled}
          onClick={() => operateExport()}
          loading={loading}
        >
          <CloudDownloadOutlined />
          {props.buttonText}
        </Button>
      )}
      {contextHolder}
    </>
  );
};

export default ExportButton;
