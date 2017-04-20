var YH = require('../../../server/YH');
var model = require('../../../model/Article');
var db = new model();

module.exports = class index extends YH {
    
    article() {
        
         console.log('jinlai');
    }
    
    detail(router) {
        var  _this = this;
        var articleInfo = db.getArticleInfoById(router.id);
        return articleInfo.then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].content = _this.utils.html_decode(data[i].content);
                }
                _this.assign('articleInfo',data);
                return _this.fetch('article/detail');
            });
    }
    
    other() {
        console.log('otherotherother');
    }
     
}
