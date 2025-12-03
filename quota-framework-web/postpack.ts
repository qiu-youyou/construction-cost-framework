/*
 * @Author: SHUANG
 * @Date: 2023-09-14 14:20:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-20 16:29:08
 * @Description:
 */
const fs = require('fs-extra');

async function postpack() {
  // 移动tarball（如果需要）
  // await fs.move('temp-pack/your-package-name-version.tgz', './your-package-name-version.tgz');

  // 清理临时目录
  await fs.remove('package');
}

postpack();
