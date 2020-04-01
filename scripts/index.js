const http = require('http');
const fs = require('fs');
const path = require('path');
const url=require("url");
var querystring=require("querystring");
// 域名， 后期可统一
const DEFAULT_DOMAIN = `http://182.61.18.142/`;

const BASE_SERVE_CONFIG = {
  DEFAULT_DOMAIN
};
// 请求的简单配置
const REQUEST_CONFIG = {
  // funcName: `method::domain::path::shallCache`
  createOrder: `post::MS_DOMAIN::train/booking/createOrder.json::false`,
};

// 将简化的配置字符串(REQUEST_CONFIG)转成对象
function _parseRequestConfigItem(str = ``) {
  const [method = `get`, domain = DEFAULT_DOMAIN, path = ``, shallCache = false] = str.split(`::`).map(item => item.trim());
  return {method, domain, path, shallCache};
}

// 去斜杠
function _end(str = ``) {
  return str.replace(/\/$/g, ``)
}

function _double(str = ``) {
  return str.replace(/\/\//g, `/`)
}

function _start(str = ``) {
  return str.replace(/^\//g, ``)
}

function _domain(str = ``) {
  return _start(str)
}

function _path(str = ``) {
  return _double(_end(str))
}

const httpsAppConfig = (function parseRequestConfigItem(REQUEST_CONFIG) {
  const ajax = {};
  Object.keys(REQUEST_CONFIG).forEach(item => {
    const config = _parseRequestConfigItem(REQUEST_CONFIG[item]);
    if (!config.path) {
      console.warn(`request ${item}'s path may lost, ` +
        `this will lead to ajax.${item} be an empty function rather than a fetch!`);
    }
    const fullPath = `${_domain(BASE_SERVE_CONFIG[config.domain] || DEFAULT_DOMAIN)}/${_path(config.path)}`;

    if (!config.path) return;
    ajax[parsePath(config.path)] = config;
  });
  return ajax;
})(REQUEST_CONFIG);

// const session = `a21c59f4-dce5-4019-9358-ebc19da8813c`;
function parsePath(path = ``) {
  return path.split("?").shift().replace(/^(\/\/|\/)/, "");
}

module.exports = function httpApp(req, res) {
  // 接受收数据
  let str = '';
  req.on('data', data => (str += data));
  // 接受数据完成
  req.on('end', () => {
    if (req.url === `/favicon.ico`) return res.end(`{}`);

    // 跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://dev.z-trip.cn:8080');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', '*');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,lang, authorization');

    if (req.method === 'OPTIONS') {return res.end('{}');}
    if (req.url === `/`) {
      res.end('');
    } else {
      console.log(str, 'str')

      var pathname=url.parse(req.url).pathname;
      if(pathname === `/electronic-contract-api/api/enterpriseLogin/v1`) {
        let data = {
          code: 0,
          data: {
            currId: 1,
            roleId: 1,
            userId: 1,
            userName: 'admin',
            verificationStatus: 3
        },
          message: '成功'
        }
        res.end(JSON.stringify(data));
      } else if (pathname === '/electronic-contract-api/api/electronicContractCompany/queryEnterpriseCertificationStatus/v1') {
        let data = {
          code: 400,
          data: [],
          message: '失败'
        }
        res.end(JSON.stringify(data));
      } else {
        let data = {
          code: 400,
          data: [],
          message: '失败'
        }
        res.end(JSON.stringify(data))
      }
      // res.send(`{}`)
      console.log(pathname, 'pathname');
      console.log(req.url, 'url')
    }
  });
};
