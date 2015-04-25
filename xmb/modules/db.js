/**
 * Created by lenovo on 2015/3/25.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
    username:String,
    password:String,
    careId:[]
});
var orderSchema = new Schema({
    personName:String,
    date:Date,
    goodsName:String,
    num:Number,
    price:Number,
    grade:String,
    tel:Number,
    email:String,
    goodsCode:String,
    classes:String,
    describe:String,
    file:String,
    imagePath:String,
    nowName:String
});

var Orders = mongoose.model('orders',orderSchema);
var Users = mongoose.model('users',userSchema);
exports.connect=function(callback){
    mongoose.connect('mongodb://localhost:27017/myDatabase',function(err){
        if(err) throw(err);
        else callback();
    });
};
exports.disconnect = function(){
    mongoose.disconnect();
};
//用户相关模块
exports.zcUser=function(user,callback){
    Users.find({username:user.username},function(err,users){
        if(err) throw(err);
        else{
            if(users.length>0){
                exports.errMsg="该用户名已被注册。";
                callback();
            }else{
                Users.create(user,function(err) {
                    if(err) throw(err);
                    else{
                        exports.errMsg="";
                        callback();
                    }
                });
            }
        }
    })
};

exports.dlUser = function(user,callback){
    Users.find({username:user.username},function(err,res){
        if(err) throw(err);
        else{
            if(res.length>0){
                if(user.password == res[0].password){//注意res是数组，user是对象
                    exports.errMsg = "";
                    exports.personName = user.username;
                    callback();
                }else{
                    exports.errMsg = "密码输入错误";
                    callback();
                }
            }else{
                exports.errMsg = "该用户名尚未注册";
                callback();
            }
        }
    });
};
//商品相关模块
exports.add=function(order,callback){
    Orders.create(order,function(err,res){
       if(err) throw (err);
        else{
           console.log(res);
           callback();
       }
    });
};

exports.orderSearch = function(order,callback){
    Orders.find(order,function(err,orders){
        if(err) throw (err);
        else{
            exports.orders = orders;
            callback();
        }
    })
};

exports.correctSearch = function(order,callback){
    Orders.find(order,function(err,res){
        if(err) throw (err);
        else{
            exports.correctOrder = res;
            exports.personName = res.personName;
            callback();
        }
    })
};

exports.orderUpdate =function(order,callback){
    Orders.update({_id:order.id},order,function(err,res){
        if(err) throw (err);
        else{
                exports.Msg = "数据更新成功！";
                callback();
        }
    })
};

exports.orderDelete = function(order,callback){
    Orders.findOne({_id:order.id},function(err,res){
        if(err) throw (err);
        else{
            console.log(res);
            res.remove();
            exports.personName = res.personName;
            exports.Msg = "商品信息删除成功！";
            console.log("商品信息删除成功！");
            callback();
        }
    });
};

//分类搜索
exports.order_search = function(order,callback){
    Orders.find({goodsCode:order.goodsCode},function(err,res){
       if(err) throw (err);
        else{

           exports.rows = res;
           callback();
       }
    });
};
//
exports.show_search = function(order,callback){
    Orders.find({_id:order.id},function(err,res){
        if(err) throw(err);
        else{

            exports.goods = res;
            exports.personName = res.personName;
            callback();
        }
    });
};

//Ajax
exports.idx_ajx = function(req,callback){
    Orders.find({},function(err,res){
        if(err){
            callback(err,null);
        }else{
            callback(null,res);
        }
    });

};
//添加图片地址
exports.upImg = function(order,callback){
    console.log(order.id);
    Orders.update({_id:order.id},order,function(err,res){
        if(err) throw err;
        else{
             console.log(res);
        }
    });
};
