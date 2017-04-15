var YH = require('../../server/YH');
var model = require('../../model/Article');
var db = new model();

module.exports = class index extends YH {
    
    index() {
        var  _this = this;
        let articles = [];
        var articleList = db.getArticleList();
        return articleList.then(function(data) {
            for (var i = 0; i < data.length; i++) {
            	data[i].content = _this.utils.html_decode(data[i].content);
            }
            _this.assign('articleList',data);
         return _this.fetch('index/index');
        });
    }  
     
}
