var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
domain=require('domain');


var users = require('./routes/users');
var db = require('./modules/db');
var order_edit = require('./modules/order_edit');
var order_search = require('./modules/order_search');
var user = require('./modules/user');
var uploade =require('./modules/uploade');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('12345',{maxAge: 3600000 }));
app.use(session({
             secret: '12345',
             cookie: {maxAge: 3600000 }
     }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err,req,res,next) {
    res.send(500,err.message);
});

//事件路由

//order处理
app.get('/order:personName', order_edit.orderget);
app.post('/order', order_edit.orderAdd);
app.get('/search',order_search.getSearch);
app.get('/person_search:personName',order_search.search);
app.get('/correct:id',order_edit.correct);
app.post('/update',order_edit.update);
app.get('/delete:id',order_edit.order_delete);
app.get('/back:personName',order_edit.correct_back);
app.get('/show:id',order_search.order_show);
//用户信息处理
app.get('/zc',user.get);
app.post('/zc',user.zc);
app.get('/dl',user.getDl);
app.post('/dl',user.dl);
app.get('/rt_index:personName',user.rt_index);
app.get('/idx_ajx',function(req,res){
    db.connect(function(){
        db.idx_ajx(req,function(err,data){
            db.disconnect();
            if(err){
                res.send(err);
            }else{
                res.json(data);
            }
        })
    })

});

//分类查询
app.get('/book_search:x',order_search.book_search);
//我的关注
app.post('/careOrder',user.careOrder);
//上传图片
app.get('/',uploade.get);
app.post('/upload',uploade.uploade);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(80);
module.exports = app;
