const fs = require("fs");
const path = require("path");
const type = require("./type");

/**
 * 尝试创建一个目录
 * @param paths 一个数组用于按序拼接成最终的路径
 * @param prevPath 前一个路径
 * @private 应该仅被mkDir 调用
 */
function _mkDir(paths, prevPath){
  try{
    fs.existsSync(prevPath) || fs.mkdirSync(prevPath);
  } catch(e) {}
  paths.length && _mkDir(paths, `${prevPath}/${paths.shift()}`);
}

/**
 * 尝试创建一个目录
 * @param dirName 目录名
 */
function mkDir(dirName) {
  if (!type.isString(dirName)) return;
  const paths = dirName.split(/[\\/]+/);
  _mkDir(paths, paths.shift());
}

/**
 * 判断是否是一个文件
 * @param path 可能的文件名
 * @return {*}
 */
function isFile(path) {return fs.statSync(path).isFile();}

/**
 * 读取一个目录， 返回该目录下的指定文件的路径和（被正则替换为空后）文件名的集合
 * @param dirPath 指定目录
 * @param reg 用于匹配和替换文件名的正则
 * @param result 用于存放结构的容器
 * @private 应该仅被readDir 调用
 */
function _readDir(dirPath, reg, result) { // path 读取的目录， reg 文件匹配的正则， result 为结果集
  const pathes = fs.readdirSync(dirPath);
  pathes.forEach(item => {
    const fullPath = path.join(dirPath, item);
    if (isFile(fullPath)) { // 判断是否为文件
      if (reg.test(item)) {
        result.push({ // 判断是否为指定文件
          path: dirPath + "/" + item, // 路径
          name: item.replace(reg, ""), // 文件名
        });
      }
    } else _readDir(dirPath + "/" + item, reg, result); // 文件夹的话 就往下读取
  })
}

/**
 * 读取一个目录， 返回该目录下的指定文件的路径和（被正则替换为空后）文件名的集合
 * @param dirPath 目录路径
 * @param reg 用于匹配和替换文件名的正则
 * @return {Array}
 */
function readDir(dirPath, reg) { // path 读取的目录， reg 文件匹配的正则 返回一个 读取完的数组
  const result = [];
  _readDir(dirPath, reg, result);
  return result;
}

/**
 * 拷贝文件到另一个目录
 * @param oriPath 原始路径（文件会直接拷贝， 目录会遍历整个目录）
 * @param target 目标路径
 */
function copyFile(oriPath, target){
  if (isFile(oriPath)) {
    fs.copyFileSync(oriPath, target)
  } else {
    mkDir(target);
    fs.readdirSync(oriPath).forEach(item => {
      copyFile(path.join(oriPath, item), path.join(target, item))
    })
  }
}

/**
 * 将一串字符 转化为其他各种格式返回
 * @param str
 * @return {{small: string, _large: string, large: string, self: string, _self: string}}
 */
function camel(str = '', noNeedToLowerCase) {
  str = str.replace(/_/g, "-");
  noNeedToLowerCase || (str = str.toLowerCase());
  return {
    large: str.replace(/-[a-zA-z]/g, a => a[1].toUpperCase()).replace(/./, a => a.toUpperCase()),
    small: str.replace(/-[a-zA-z]/g, a => a[1].toUpperCase()).replace(/./, a => a.toLowerCase()),
    self: str,
    _large: str.replace(/-[a-zA-z]/g, a => `_${a[1].toUpperCase()}`).replace(/./, a => a.toUpperCase()),
    _self: str.replace(/-/g, '_'),
  }
}

/**
 * 读取一个目录， 返回该目录下的指定文件的路径和（被正则替换为空后）文件名的集合， 并按之前的列表排序
 * @param dirPath 目录路径
 * @param reg 用于匹配和替换文件名的正则
 * @param prevList 用于排序的列表
 * @return {*}
 * @private 应该仅被 deepReadDir 调用
 */
function getMaxId(arr) {
  return arr && arr.length ? Math.max.apply(null, arr.map(item => +item.id)) : 0;
}
function _deepReadDir(dirPath, reg, routerIds, prevList, parentId, type, result) { // path 读取的目录， reg 文件匹配的正则， result 为结果集
  const pathes = fs.readdirSync(dirPath);
  return pathes.map(item => {
    const fullPath = path.join(dirPath, item);
    if (!isFile(fullPath)) { // 判断是否不为文件
      const param = camel(item.replace(reg, ''));
      prevList.includes(param.self) || prevList.push(param.self);
      let thisMenu = routerIds.find(item => item.route === param.self);
      if (!thisMenu) {
        thisMenu = {
          id: '0',
          name: param.self,
          type,
          route: param.self,
          parentId
        };
        reg.test(item) && routerIds.push(thisMenu);
      }

      const nextResult = [];
      const ret = {
        meta: {title: param.self},
        path: `${param.self}`,
        name: param.self,
        component: `() => import('${fullPath.replace(/^src/, '@').replace(/\\/g, '/')}/${param._large}.vue')`,
        children: _deepReadDir(dirPath + "/" + item, reg, routerIds, prevList, thisMenu.id, type + 1, nextResult),
        hidden: !reg.test(item)
      }
      ret.children = nextResult.concat(ret.children);
      ret.children = ret.children.length ? ret.children : undefined;
      return ret;
    } else if (/(_Detail|_Edit)\.vue$/.test(item)){
      const param = camel(item.replace(/\.vue$/, ''));
      result && result.push({
        meta: {title: param.self},
        path: `${param.self}`,
        name: param.self,
        component: `() => import('${fullPath.replace(/^src/, '@').replace(/\\/g, '/')}')`,
        hidden: true
      })
    }
  }).filter(item => item).sort(function(a, b){
    return prevList.indexOf(a.name) > prevList.indexOf(b.name) ? 1 : -1;
  })
}
/**
 * 读取一个目录， 返回该目录下的指定文件的路径和（被正则替换为空后）文件名的集合， 并按之前的列表排序
 * @param dirPath 目录路径
 * @param reg 用于匹配和替换文件名的正则
 * @param prevList 用于排序的列表
 * @param routerIds 路由ID
 * @return {*}
 */
function deepReadDir(dirPath, reg, routerIds, prevList) { // path 读取的目录， reg 文件匹配的正则 返回一个 读取完的数组
  return _deepReadDir(dirPath, reg, routerIds, prevList, undefined, 1);
}

function removeFolder(paths) {
  mkDir(paths);
  const files = fs.readdirSync(paths);
  files.forEach((file) => {
    const curPath = path.join(paths, file);
    fs.statSync(curPath).isDirectory()
        ? removeFolder(curPath)
        : fs.unlinkSync(curPath);
  });
  try {
  fs.rmdirSync(paths);
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  mk: mkDir,
  readFileInType: readDir,
  deepReadDir: deepReadDir,
  copy: copyFile,
  camel,
  remove: removeFolder,
};
