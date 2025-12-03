/*
 * @Author: SHUANG
 * @Date: 2023-09-21 10:25:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 18:13:16
 * @Description: 统一导出资源
 */
export { default as JDCMDAnnexTable } from './annex/AnnexTable';

/** constant */
export { default as JDCMDICONMAP } from './constant/iconMap';
import * as JDCMDLAYOUTCOL from './constant/layoutCol';
import * as JDCMDPATH from './constant/path';
import * as JDCMDVALUEENUM from './constant/valueEnum';
import * as JDCMDWORKFLOW from './constant/workflow';
export { default as JDCMDVERIFICATION } from './constant/verification';
export { JDCMDLAYOUTCOL, JDCMDPATH, JDCMDVALUEENUM, JDCMDWORKFLOW };

/** formItems  */
export { default as JDCMDChooseProduction } from './formItems/ChooseProduction';
export { default as JDCMDUserMentionsFormItem } from './formItems/UserMentionsFormItem';

/** process */
export { default as JDCMDAbandonButton } from './process/AbandonButton';
export { default as JDCMDForwardButton } from './process/ForwardButton';
export { default as JDCMDProcessAnswer } from './process/ProcessAnswer';
export { default as JDCMDProcessBusiness } from './process/ProcessBusiness';
export { default as JDCMDProcessButton } from './process/ProcessButton';
export { default as JDCMDProcessChart } from './process/ProcessChart';
export { default as JDCMDProcessHistory } from './process/ProcessHistory';
export { default as JDCMDProcessHistoryTable } from './process/ProcessHistoryTable';
export { default as JDCMDRejectButton } from './process/RejectButton';
export { default as JDCMDReturnButton } from './process/ReturnButton';
export { default as JDCMDSubmitterButton } from './process/SubmitterButton';
export { default as JDCMDUserMentions } from './process/UserMentions';
import type * as JDCMDProcessTypings from './process/typing';
export type { JDCMDProcessTypings };

/** services */
import * as JDCMDSERVICESSYSTEM from './services/system/index';
import type {
  FormType,
  DictDefine,
  DictItemDefine,
  WorkflowSaveCallbackParams,
} from './services/system/typings';
export type JDCMDSystemTypings = {
  FormType: FormType;
  DictDefine: DictDefine;
  DictItemDefine: DictItemDefine;
  WorkflowSaveCallbackParams: WorkflowSaveCallbackParams;
};
export { JDCMDSERVICESSYSTEM };

import * as JDCMDSERVICESUSER from './services/user/index';
import type {
  CurrentUser,
  LoginResult,
  LoginParams,
  PassParams,
  MenuItem,
  SysSettings,
} from './services/user/typings';
export type JDCMDUserTypings = {
  CurrentUser: CurrentUser;
  LoginResult: LoginResult;
  LoginParams: LoginParams;
  PassParams: PassParams;
  MenuItem: MenuItem;
  SysSettings: SysSettings;
};
export { JDCMDSERVICESUSER };

/** textTag */
export { default as JDCMDBillTypeStatus } from './textTag/BillTypeStatus';
export { default as JDCMDProcessStatus } from './textTag/ProcessStatus';
export { default as JDCMDProcessTag } from './textTag/ProcessTag';
export { default as JDCMDRoleTypeText } from './textTag/RoleTypeText';
export { default as JDCMDStatusText } from './textTag/StatusText';

/** views */
export { default as JDCMDHome } from './views/home';
export { default as JDCMDBulletin } from './views/message/Bulletin';
export { default as JDCMDNotice } from './views/message/Notice';
export { default as JDCMDApLog } from './views/monitor/ApLog';
export { default as JDCMDOpLog } from './views/monitor/OpLog';
export { default as JDCMDLoading } from './views/result/Loading';
export { default as JDCMDNoFoundPage } from './views/result/404';

export { default as JDCMDField } from './views/sysConfig/Field';
export { default as JDCMDHoliday } from './views/sysConfig/Holiday';
export { default as JDCMDLink } from './views/sysConfig/Link';
export { default as JDCMDPlatForm } from './views/sysConfig/Platform';
export { default as JDCMDShortcut } from './views/sysConfig/Shortcut';
export { default as JDCMDStatic } from './views/sysConfig/Static';

export { default as JDCMDBizDict } from './views/system/BizDict';
export { default as JDCMDDict } from './views/system/Dict';
export { default as JDCMDMenu } from './views/system/Menu';
export { default as JDCMDOrgan } from './views/system/Organ';
export { default as JDCMDRegion } from './views/system/Region';
export { default as JDCMDRole } from './views/system/Role';
export { default as JDCMDUser } from './views/system/User';
export { default as JDCMDWork } from './views/system/Work';

export { default as JDCMDChangePassword } from './views/user/ChangePassword';
export { default as JDCMDLogin } from './views/user/Login';

export { default as JDCMDInstance } from './views/workflow/Instance';
export { default as JDCMDModel } from './views/workflow/Model';

export { default as JDCMDWindow } from './views/Window';
