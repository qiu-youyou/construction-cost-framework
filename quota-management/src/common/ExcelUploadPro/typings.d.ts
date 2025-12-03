/*
 * @Author: SHUANG
 * @Date: 2024-02-27 16:15:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-15 13:59:16
 * @Description: EXCEl 高级导入
 */
import { UploadFile } from 'antd';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { BaseModalProps, ModalActionType } from 'jd-framework-web/package/components';

export type StepsKeys = 'upload' | 'scope' | 'sheet' | 'column';
export type ExcelUploadProProps = {
  /**
   * @name trigger
   * @description 触发按钮
   * @default Button
   */
  trigger?: ReactNode;

  /**
   * @name triggerText
   * @description 触发按钮文字内容
   * @default 导入EXCEL
   */
  triggerText?: string;

  /**
   * @name disabled
   * @description trigger 是否禁用
   * @default false
   */
  triggerDisabled?: boolean;

  /**
   * @name importType
   * @description 默认导入 选项导入
   * @type default | option
   * @default option
   */
  importType?: 'default' | 'option';

  /**
   * @name modalTitle
   * @description 弹窗标题
   * @default 默认 triggerText
   */
  modalTitle?: string;

  /**
   * @name modalProps
   * @description 弹窗属性
   * @default {}
   */
  modelProps?: BaseModalProps;

  /**
   * @name modalActionRef
   * @description 弹窗action
   */
  modalActionRef?: ModalActionType;

  /**
   * @name onSubmit
   * @description 提交方法 (params: { ids: string[]; billStatus: 3 | 4 }) => Promise
   */
  onSubmit?: (params: any) => Promise<FETCH.Res> | any;

  /**
   * @name onSubmitFinish
   * @description onSubmitFinish onSubmit返回后触发
   */
  onSubmitFinish?: (res?: FETCH.Res) => void;

  /**
   * @name formAppendParams
   *  @description 发送表单时追加的参数
   */
  formAppendParams?: any;

  /**
   * @name mode
   * @description 导入模式
   * @default single
   */
  mode?: 'single' | 'multiple';

  /**
   * @name stepsConfig
   * @desicription 步骤条配置
   * @default [{...}]
   */
  stepsConfig?: {
    [key in StepsKeys]?: {
      content?: JSX.Element;
      title?: string;
      key?: string;
    };
  };

  /** 单条上传需要配置 显示的表名称 */
  workbookConfig?: { tableName?: string };

  /** 是否覆盖导入 否则追加 */
  isCover?: 'Y' | 'N';
};

/**
 * @Author: SHUANG
 * @Description: 内部传递 PROPS
 * @Date: 2024-02-28 16:32:23
 */
export type ExcelUploadProPropsContent = {
  /** 当前上传的文件列表  */
  fileSourceList?: UploadFile[];
  setFileSourceList?: Dispatch<SetStateAction<UploadFile[]>>;

  workbookInfo?: any;
  setWorkbookInfo?: Dispatch<SetStateAction<any | undefined>>;

  /** 当前选择的导入范围 */
  structuralScopeSelect?: StructuralScopeItem[];
  setStructuralScopeSelect?: Dispatch<SetStateAction<StructuralScopeItem[] | undefined>>;

  /** 关联的导入范围和页签 */
  sheetScopeMatching?: Map<string, string>;

  /** 默认匹配信息 */
  excelMatchInfo?: ExcelMatchInfoJSON;
  setExcelMatchInfo?: Dispatch<SetStateAction<ExcelMatchInfoJSON | undefined>>;

  /** 解析中 */
  setLoading?: Dispatch<SetStateAction<boolean>>;

  /** 是否覆盖导入 否则追加 */
  isCover?: 'Y' | 'N';
};

export type EXCELTableProps = {
  sheetScopeMatchingCurrent?: { tableName: string; sheetName: string };
} & ExcelUploadProPropsContent;

/** 专业数据项 */
export type StructuralScopeItem = any;

export type ExcelMatchInfoJSON =
  | {
      dictionary?: string;
      firstMatchLine?: string;
      params?: string;
    }
  | any;

/** 匹配数据信息 */
export type ExcelMatchInfo = {
  dictionary?: { [key: string]: string[] };
  firstMatchLine?: { [key: string]: string[] };
  params?: [{ [key: string]: string }];
};
