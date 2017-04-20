const send = require('koa-send');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const path = require('path');
const fs = require('fs');
const app = new Koa();
app.use(bodyParser());
var U = '';
var MOD = '';
var CTR = '';
var ACT = '';
var DIR = '';
var DIR = 'home';
var LASTID = '';
var PARAMS = '';
var PARAMSOBJ = {};
render(app, {
    root: path.join(__dirname, 'template'),
    layout: '',
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(async function (ctx) {
    U = ctx.request.url;
    var requestUrl = ctx.request.header.referer
    var host = ctx.request.header.host
    if (U == '/favicon.ico'){return false;}
    if (U == '/') {
        U = 'index/index';
        ACT = 'index';
        var MOD = '';
    } else {
        U = U.substring(1);
        if (U.substr(U.length-1,1)=='/') {
            U = U.substring(0,U.length-1);
        }
        U = U.split('?');
        U = U[0].split("/");
        if (U[0] == 'api') {
            DIR = 'api';
            MOD = U[1];
            CTR = U[1] ? U[1] : 'index';
            ACT = U[2] ? U[2] : 'index';
            U = CTR;
        } else {
            DIR = 'home';
            
            switch(U.length) {
                case 1:
                    MOD = U[0];
                    CTR = U[0];
                    ACT = U[0];
                break;
                case 2:
                    MOD = U[0];
                    CTR = U[0];
                    if (U[1].indexOf('-') > -1) {
                        ACT = U[0];
                        PARAMS = U[1];
                    } else {
                        if (new RegExp("^[0-9]*$").test(U[1]) || new RegExp("\.html$").test(U[1]) ) {
                            ACT = 'detail';
                            LASTID = parseInt(U[1]);
                        } else {
                            ACT = U[1];
                        }
                    }
                break;
                case 3:
                    MOD = U[0];
                        try{
                            fs.accessSync('./app/'+ DIR + '/' + MOD + '/' + U[1] + '.js',fs.F_OK);
                            CTR = U[1];
                            if (new RegExp("^[0-9]*$").test(U[2]) || new RegExp("\.html$").test(U[2]) ) {
                                ACT = 'detail';
                                LASTID = parseInt(U[1]);
                            } else {
                                if (U[2].indexOf('-') > -1) {
                                    ACT = U[1];
                                    PARAMS = U[2];
                                } else {
                                    ACT = U[1];
                                }
                            }
                        }catch(e){
                               CTR = U[0];
                            if (new RegExp("^[0-9]*$").test(U[1]) || new RegExp("\.html$").test(U[1]) ) {
                                LASTID = parseInt(U[2]);
                            } else {
                                if (U[2].indexOf('-') > -1) {
                                    PARAMS = U[2];
                                } 
                            }
                            ACT = U[1];
                        }
                break;
                default:
                    MOD = U[0];
                    CTR = U[0];
                    ACT = U[1];
                break;
            }
            U = MOD + '/' + CTR;
        }
    }
    if (PARAMS) {
        PARAMS = PARAMS.split('__');
    }
    if (PARAMS.length > 0) {
        for (var i = 0; i < PARAMS.length; i++) {
            var tempArray = PARAMS[i].split('-');
            PARAMSOBJ[tempArray[0]] = tempArray[1];
        }    
    }
    PARAMSOBJ['id'] = LASTID;
    if (MOD == 'assets') {
        await send(ctx, ctx.path, { root: __dirname + '/' });
    } else {
        var controller = require('./app/' + DIR + '/' +U);
        var p = new controller();
        var tplData = await p[ACT](PARAMSOBJ);
        if (DIR != 'api') {
            await ctx.render(tplData.tplPath,tplData.data)
        } else {
            ctx.body = tplData;
        }
    }
});
app.listen(3000);
console.log('listening on port 3000');