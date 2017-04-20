var YH = require('../../server/YH');

module.exports = class article extends YH {
    test(router) {
        if (router.method == 'POST') {
            console.log('欢迎测试YH-CMS API接口');
            return this.jsonSuccess('测试成功');
        }
    }
}