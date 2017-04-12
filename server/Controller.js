/**
 * 控制器基类
 * 
 * @todo 所有的控制器继承此基类
 */
module.exports = class Controller {
    constructor() {
        var assignData = {};
        this.assign = function(dataKey,dataVal) {
            assignData[dataKey] = dataVal;
            return assignData;
        }
        this.fetch = function(tplPath) {
            return {tplPath: tplPath,data: assignData}
        }
    }
   
}