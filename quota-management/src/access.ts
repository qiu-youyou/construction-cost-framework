/*
 * @Author: SHUANG
 * @Date: 2022-11-16 10:37:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 13:44:10
 * @Description:
 */

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * 我们约定了 src/access.ts 为我们的权限定义文件，该文件需要默认导出一个方法，
 * 导出的方法会在项目初始化时被执行。该方法需要返回一个对象，对象的每一个值就对应定义了一条权限。如下所示：
 * The exported method will be executed when the project is initialized.
 * This method needs to return an object, and each value of the object defines a permission. As follows:
 * */

import useAuthRoute from 'jd-framework-web/package/utils/auth/useAuthRoute';

export default useAuthRoute;
