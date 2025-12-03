/*
 * @Author: SHUANG
 * @Date: 2023-09-20 10:18:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-26 10:08:37
 * @Description: 统一导出资源
 */

/** ActionButtonction */
export { default as JDActionIdsButton } from './ActionButton/ActionIdsButton';
export { default as JDCalcButton } from './ActionButton/CalcButton';
export { default as JDDeleteButton } from './ActionButton/DeleteButton';
export { default as JDDetailsButton } from './ActionButton/DetailsButton';
export { default as JDDisableButton } from './ActionButton/DisableButton';
export { default as JDEditButton } from './ActionButton/EditButton';
export { default as JDEnableButton } from './ActionButton/EnableButton';
export { default as JDExportButton } from './ActionButton/ExportButton';
export { default as JDModalButton } from './ActionButton/ModalButton';
export { default as JDMoveButton } from './ActionButton/MoveButton';
export { default as JDPlusButton } from './ActionButton/PlusButton';
export { default as PlusLineButton } from './ActionButton/PlusLineButton';
export { default as JDPlusLevelButton } from './ActionButton/PlusLevelButton';
export { default as JDUploadFileButton } from './ActionButton/UploadFileButton';

export type { ActionButtonProps } from './ActionButton/typings';

/** BaseCard */
export type { BaseCardProps } from './BaseCard/typings';
export { default as JDBaseCard } from './BaseCard';

/** BaseDropDown */
export { default as JDBaseDropDown } from './BaseDropDown';

/** BaseFooter */
export { default as JDBaseFooter } from './BaseFooter';

/** BaseModal */
export type { ModalActionType, BaseModalProps } from './BaseModal/typings';
export { default as JDBaseModal } from './BaseModal';

/** BaseReport */
export { default as JDBaseReport } from './BaseReport';

/** BaseSchemaForm */
export { default as JDBaseSchemaForm } from './BaseSchemaForm';
export type { BaseSchemaFormProps, FormColumnsDefine } from './BaseSchemaForm/typings';

/** BaseSwitchTabs */
export type { BaseSwitchTabsProps } from './BaseSwitchTabs';
export { default as JDBaseSwitchTabs } from './BaseSwitchTabs';

/** BaseTable */
export { default as JDBaseTable } from './BaseTable';
export type {
  BaseTableProps,
  TableColumnsDefine,
  TableSearchDefine,
  TablePaginationDefine,
  TableEditableDefine,
  TableSelectionDefine,
  TableRowOnClickDefine,
  TableRowOnDoubleClickDefine,
  TablePatternDefine,
  TableToolbarDefine,
  TableActionType,
  TableServiceDefine,
  TableRowClassDefine,
} from './BaseTable/typings';

/** BaseTree */
export { default as JDBaseTree } from './BaseTree';
export type {
  TreeServiceDefine,
  TreeOnRowDefine,
  TreeOnCheckDefine,
  TreeActionType,
  BaseTreeProps,
} from './BaseTree/typings';

/** ChangeLogText */
export { default as JDChangeLogText } from './ChangeLogText/index';

/** CustomQuery */
export type { QueryConditionItemType, QueryFieldItemType } from './CustomQuery/typings';
export { default as JDCustomQuery } from './CustomQuery';

/** DashBoardBorder */
export { default as JDDashBoardBorder } from './DashBoardBorder';

/** HeaderDropdown */
export { default as JDHeaderDropdown } from './HeaderDropdown';

/** HeaderSearch */
export { default as JDHeaderSearch } from './HeaderSearch';

/** HelpDocument */
export { default as JDHelpDocument } from './HelpDocument';

/** HelpVideo */
export { default as JDHelpVideo } from './HelpVideo';

/** LabelColor */
export { default as JDLabelColor } from './LabelColor';

/** RadioGroupButton */
export { default as JDRadioGroupButton } from './RadioGroupButton';

/** RadioGroupButton */
export { default as JDRichTextFormItem } from './RichTextFormItem';

/** SplitPane */
export type { PaneContainerPropsType } from './SplitPane';
export type { SplitPaneProps } from './SplitPane/typings';

// export default { JDPaneContainer: PaneContainer };
export { default as JDSplitPane } from './SplitPane';
import { PaneContainer } from './SplitPane';
// export const JDPaneContainer = PaneContainer;

/** UploadImage */
export { default as JDUploadImage } from './UploadImage';

/** UploadInput */
export { default as JDUploadInput } from './UploadInput';

/** useToolSearch */
export { default as JDUseToolSearch } from './useToolSearch';

/** ViewContainer */
export { default as JDSpaceView } from './ViewContainer/SpaceView';
export type { ViewContainePropsType } from './ViewContainer';
export { default as JDViewContainer } from './ViewContainer';
