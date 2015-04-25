/**
 * Created by lenovo on 2015/4/3.
 */
var formidable = require('formidable');
var db = require('./db');
var Path;
fs = require('fs');
TITLE = 'formidable上传示例';
AVATAR_UPLOAD_FOLDER = '/avatar/';
var imgPath;

exports.get = function(req,res){
    res.render('index', { title: TITLE });
};
exports.uploade = function(req,res){
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
                console.log(order);
                db.add(order,function(){
                    db.disconnect();
                    req.session.userName =fields.personName;
                });
            });
        });
        Path = avatarName;
    });
    if(Path){
        res.render('order', {personName:'',errMsg:"ok",rows:[]});
    }
};

