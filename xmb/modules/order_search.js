/**
 * Created by lenovo on 2015/3/24.
 */

var db = require('./db');
exports.getSearch=function(req,res){
    res.render('order_search', {order:null});
};

exports.search = function(req,res,next){
    var d=domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
          var order = {personName:req.params.personName};
            db.orderSearch(order,function(){
                db.disconnect();
                req.session.username = req.params.personName;
                res.render('order_search',{orders:db.orders,personName:req.params.personName})
            });
        });
    });
};
//分类查询
exports.book_search = function(req,res,next){
    var d = domain.create();
    d.on('err',function(){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var order = new Object();
            order.goodsCode = req.params.x;
            db.order_search(order,function(){
                db.disconnect();
                console.log(req.session.username);
                res.render('show',{rows:db.rows,personName:req.session.username,errMsg:null});
            });
        });
    });
};
//单个商品展示查询
exports.order_show = function(req,res,next){
    var d = domain.create();
    d.on('on',function(){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var order = new Object();
            order.id = req.params.id;
            db.show_search(order,function(){
                db.disconnect();
                res.render('goods',{goods:db.goods,personName:req.session.username});
            });
        });
    });
};