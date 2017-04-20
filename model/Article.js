
const YH = require('../server/YH');

module.exports = class Article extends YH {

    getArticleList(num = 10, order = 'publish_time desc'){

        return this.db.query(`select * from mip_articles order by ${order} limit ${num}`);
 
    }

    getArticleInfoById(id){
        
        return this.db.query(`select * from mip_articles where id = ${id}`);
    }

}