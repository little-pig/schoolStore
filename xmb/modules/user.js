/**
 * Created by lenovo on 2015/3/25.
 */
//var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./db');
exports.get=function(req,res){
    res.render('zc',{errMsg:''});
};
exports.zc=function(req,res,next){
    var d=domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            console.log('ok2');
            var user = new Object();
            user.username=req.body.username;
            user.password=req.body.password;
            db.zcUser(user,function(){
                db.disconnect();
                if(db.errMsg){
                    res.render('zc',{username:req.body.username,errMsg:db.errMsg});
                    console.log(db.errMsg);
                }else{
                    res.render('dl',{username:req.body.username,errMsg:null});
                }
            });
        });
    });
};
exports.getDl = function(req,res){
    res.render('dl',{errMsg:''});
};

exports.dl = function(req,res,next){
    var d=domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var user = new Object();
            user.username = req.body.username;
            user.password = req.body.password;
            db.dlUser(user,function(){

                db.disconnect();
                if(db.errMsg){
                    res.render('dl',{errMsg:db.errMsg});
                }else{

                    req.session.username = req.body.username;
                    res.render('index',{personName:req.session.username,errMsg:null,rows:[]});
                }
            })
        });
    });
};
exports.rt_index = function(req,res){
    req.session.username = req.params.personName;
    res.render('index',{personName:req.params.personName,rows:[]});
};

//我的关注
exports.careOrder = function(req,res,next){
    var d= domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var order = new Object();
            var goods = new Object();
            order.personName = req.body.personName;
            order.id = req.body.id;

            goods.personName = req.body.nowName;
            goods.price = req.body.price;
            goods.goodsName = req.body.goodsName;
            goods.describe = req.body.describe;
            db.careOrder(order,function(){
                db.disconnect();
                req.session.username = req.body.personName;
                res.render('index',{personName:req.body.personName,errMsg:db.errMsg,goods:goods});
            });
        });
    });
};
exports.idx_ajx = function(req,res){
    var d=domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            console.log('ok');
            var order;
            db.idx_ajx(order,function(){
                db.disconnect();
                console.log(db.rows);
               res.render('index',{personName:req.session.username,rows:db.rows,errMsg:null});
            });
        });
    });
};
