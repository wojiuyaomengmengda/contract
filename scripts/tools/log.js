/**
 * log提供三个方法 一个log 也是自身， 接受一个输出的内容（不含对象）
 * use 定义上一个log的显示颜色，
 * end，输出上一个end之间的所有信息。
 */

function log(txt) {
  txt && (log.txt || (log.txt = [])).push({txt: txt});
  return log;
}

log.log = log;
log.use = function (color) {
  const len = log.txt && log.txt.length;
  if (len) {
    const item = log.txt[len - 1];
    if (color[0] === "b") item.txt = " " + item.txt.replace(/(?:^[ ]+)([.]+)(?:[ ]+$)/, "$1") + " ";
    item.color = color;
  }
  return log;
};
log.end = function () {
  console.log((log.txt || (log.txt = [])).map(item => {
    const color = log.maps[item.color];
    return (color || "") + item.txt + (color ? "\033[0m " : "");
  }).join(""));
  log.txt = [];
  return log;
};
const colorMap = {
  e: "1",
  s: "2",
  w: "3",
  p: "7",
  t: "6",

  be: "71",
  bs: "72",
  bw: "73",
  bt: "76",
}

function _makeColorMap(textColor, bgColor) {
  textColor = textColor ? ("3" + textColor) : "";
  bgColor = bgColor ? (";4" + bgColor) : "";
  return "\033[" + textColor + bgColor + "m";
}

function makeColorMap(ignoreEqul) {
  const map = {};
  new Array(8).fill(1).forEach((nul, i) =>
    new Array(8).fill(1).forEach((nul, j) =>
      ignoreEqul ? i !== j && (map["" + i + j] = _makeColorMap(i, j)) :
        map["" + i + j] = _makeColorMap(i, j)
    )
  )
  new Array(8).fill(1).forEach((nul, i) =>
    map[i] = _makeColorMap(i)
  )
  return map;
}

const maps = makeColorMap(true);
log.maps = {}
Object.keys(colorMap).forEach(item => {
  log.maps[item] = maps[colorMap[item]];
  log[item] = txt => log(txt).use(item);
});


// 演示
//Object.keys(log.maps).forEach(item=>
//	log(item).use(item).end()
//)
// 演示2
// log("err:").use("be")("出错啦！").use("e")
// ("warn:").use("bw")("警告啦！").use("w")
// ("succ:").use("bs")("成功啦！").use("s").end()

module.exports = log;
