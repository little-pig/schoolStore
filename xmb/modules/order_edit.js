/**
 * Created by lenovo on 2015/3/24.
 */
var formidable = require('formidable');
var db = require('./db');
var Path;

exports.get=function(req,res){
    res.render('order', {order:null});
};
exports.orderget=function(req,res){
    req.session.username = req.params.personName;
    res.render('order', {order:null,errMsg:'',personName:req.params.personName});
};

exports.orderAdd = function(req,res,next){
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files,res) {
        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }

        var extName = '';  //后缀名
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index', { title: TITLE });
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.fulAvatar.path, newPath);  //重命名
        var d=domain.create();
        d.on('err',function(err){
            next(err);
        });
        d.run(function(){
            db.connect(function(){
                var order = new Object();
                order.personName = fields.personName;
                order.goodsName = fields.goodsName;
                order.num = fields.num;
                order.price = fields.price;
                order.grade = fields.grade;
                order.tel=fields.tel;
                order.email = fields.email;
                order.date=new Date(fields.date);
                order.goodsCode = fields.goodsCode;
                order.classes = fields.classes;
                order.describe = fields.describe;
                order.file = fields.file;
                order.imagePath = avatarName;
                db.add(order,function(){
                    db.disconnect();
                    req.session.userName =fields.personName;
                });
            });
        });
    });
    res.render('order', {personName:req.session.username,errMsg:"ok",rows:[]});
};
exports.correct = function(req,res,next){
    var d=domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var order = {_id:req.params.id};
            db.correctSearch(order,function(){
                db.disconnect();
                req.session.username = db.personName;
                res.render('correct',{correctOrder:db.correctOrder,errMsg:'',
                    personName:db.personName});
            });
        });
    });
};
exports.update = function(req,res,next){
    var d = domain.create();
    d.on('err',function(err){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var order = new Object();
            order.id = req.body.id;
            order.personName = req.body.personName;
            order.goodsName = req.body.goodsName;
            order.num = req.body.num;
            order.price = req.body.price;
            order.grade = req.body.grade;
            order.tel=req.body.tel;
            order.email = req.body.email;
            order.date=new Date(req.body.date);
            order.goodsCode = req.body.goodsCode;
            order.classes = req.body.classes;
            order.describe = req.body.describe;
            db.orderUpdate(order,function(){
                db.disconnect();
                req.session.username = req.body.personName;
                res.render('order',{errMsg:db.Msg,personName:req.body.personName});
            })
        });
    });
};

exports.order_delete = function(req,res,next){
    var d = domain.create();
    d.on('err',function(){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            var order = new Object();
            order.id = req.params.id;
            db.orderDelete(order,function(){
                db.disconnect();
                req.session.username =db.personName;
                res.render('order',{errMsg:db.Msg,personName:db.personName});
            });
        });
    })
};

exports.correct_back = function(req,res,next){
    var d = domain.create();
    d.on('err',function(){
        next(err);
    });
    d.run(function(){
        db.connect(function(){
            db.disconnect();
            req.session.username = req.params.personName;
           res.render('order',{errMsg:'',personName: req.params.personName});
        });
    });
};
