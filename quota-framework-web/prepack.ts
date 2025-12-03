/*
 * @Author: SHUANG
 * @Date: 2023-09-14 14:20:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 15:01:33
 * @Description:
 */

const fsPre = require('fs-extra');

async function prepack() {
  const src = ['app', 'common', 'components', 'styles', 'utils']; // 列出所有需要处理的组件目录

  // 创建临时目录 jd-web-components
  await fsPre.ensureDir('package');

  // 复制所需的文件和目录
  await fsPre.copy(`config`, `package/config`);
  await fsPre.copy(`mock`, `package/mock`);

  // 循环处理每个组件目录
  await fsPre.copy(`src/index.d.ts`, `package/index.d.ts`);
  for (const item of src) {
    // 复制当前组件到 jd-web-components 目录下
    await fsPre.copy(`src/${item}`, `package/${item}`);
  }
}

prepack();
