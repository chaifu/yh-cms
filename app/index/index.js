var YH = require('../../server/YH');

module.exports = class index extends YH {
    
 index() {
        return this.fetch('index/index');
    }
}
