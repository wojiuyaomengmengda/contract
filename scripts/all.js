const argv = process.argv;
const path = require('path');
const log = require('./tools/log.js');

// [
//     'proxy'
// ].forEach(paths => {
// });
let paths = 'proxy'
try{
    if(argv.includes(paths)){
        log.t('exec script:').w(paths).end();
        require(`./${paths}`)();
        log.t('exec script:').w(paths).s('success!').end();
    }
}catch(e) {
    console.log(paths, e)
}
// 暴露出去， 給別的模塊使用
module.exports =function (list) {
    timeout((list || []).map(paths => {
        return () => {
            try{
                require(path.join(process.cwd(), `./scripts/${paths}`))();
            }catch(e) {
                console.log(paths, e)
            }
        }
    }), 2000);
};