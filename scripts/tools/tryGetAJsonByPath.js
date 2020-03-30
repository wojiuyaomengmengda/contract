const log = require("./log");
const fs = require('fs');
module.exports = function tryGetAJsonByPath(i18nJsonPath) {
  let ret;
  let retStr
  try {
    // 如果 i18nJsonStr 是undefined 那么应该被处理；
    try {
      retStr = fs.readFileSync(i18nJsonPath, {encoding: 'utf-8'})
    } catch (e) {
      // 这里报错多半是没有找到对应文件导致的 // 新建一个对象作为返回值
      // console.log(e) // 这里就把错误吃掉吧
      log.be(`tips!`).t(`can not find file '${i18nJsonPath}'. we created a new object instead.`).end();
      retStr = `{}`;
    }
    ret = eval(`(${
      retStr
        .replace(/^[ \t\n\r]*export default/, '')})`);
  } catch (e) {
    // 如果有文件， 但是文件内容被修改导致解析数据出错， 则应该让用户修正后再重新执行；
    // 打印出错误日志方便调试；
    log.be(`error!`).e(`parse json error! make sure file '${i18nJsonPath}' is in right order!`).end();
    // console.log(
    //   retStr
    //     .replace(/'/g, `"`)
    //     .replace(/^[ \t\n\r]*export default/, '').slice(1000, 1100))
    console.log(e)
  }
  return ret;
}
