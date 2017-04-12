const send = require('koa-send');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const path = require('path');
const app = new Koa();
app.use(bodyParser());
render(app, {
    root: path.join(__dirname, 'template'),
    layout: '',
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(async function (ctx) {
    U = ctx.request.url;
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
        U = U.split("/");
        switch(U.length) {
            case 1:
                MOD = U[0];
                CTR = U[0];
                ACT = U[0];
            break;
            case 2:
                MOD = U[0];
                CTR = U[0];
                ACT = U[1];
                if (new RegExp("^[0-9]*$").test(ACT)) {
                    ACT='detail';
                }
            break;
            case 3:
                MOD = U[0];
                CTR = U[0];
                ACT = U[1];
            break;
        }
        U = MOD + '/' + CTR;
    }
    if (MOD == 'assets') {
        await send(ctx, ctx.path, { root: __dirname + '/' });
    } else {
        var controller = require('./app/'+U);
        var p = new controller();
        var tplData = await p[ACT]();
        await ctx.render(tplData.tplPath,tplData.data)
    }
});
app.listen(3000);
console.log('listening on port 3000');