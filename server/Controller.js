/**
 * 控制器基类
 * 
 * @todo 所有的控制器继承此基类
 */

module.exports = class Controller {
    constructor(roter) {
        var assignData = {};
        this.assign = function(dataKey,dataVal) {
            assignData[dataKey] = dataVal;
            return assignData;
        }
        this.fetch = function(path) {
            if (!path) {
                console.log('缺少模块路径参数');
            }
            return {tplPath: path,data: assignData}
        }
        this.jsonError = function (msg,data,code = -1){
            return JSON.stringify({'code': code,'data': data ? data : '', 'msg': msg ? msg : ''});
        }
        this.jsonSuccess = function (msg,data,code = 1){
            return JSON.stringify({'code': code,'data': data ? data : '', 'msg': msg ? msg : ''});
        }
    }
   
}