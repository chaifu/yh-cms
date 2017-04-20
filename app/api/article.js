var YH = require('../../server/YH');


module.exports = class about extends YH {
    test() {
        console.log('欢迎测试YH-CMS API接口');
        return this.jsonSuccess('测试成功');
        return this.jsonError('错误返回');
    }
}