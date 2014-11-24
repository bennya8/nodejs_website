var User = require('../../models/user');
var async = require('async');
var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var helper = require('../../helper/helper');

/* attachment */
exports.attachments = function (req, res) {
    var uploadPath = path.join(__dirname, '../../public/uploads/');
    var uploadFiles = req.files;
    var saveFiles = [];

    if (uploadFiles) {
        for (i in uploadFiles) {
            var file = uploadFiles[i];
            var data = fs.readFileSync(file.path);
            fs.writeFileSync(uploadPath + file.name, data);
            saveFiles.push({
                'name': file.name,
                'origin_name': file.originalname,
                'url': '/public/uploads/' + file.name
            });
        }
        res.json({
            status: 0,
            message: 'upload success',
            files: saveFiles
        });
    } else {
        res.json({
            status: -1,
            message: 'upload error'
        });
    }
};

/* authorize */
exports.authorize = function (req, res) {
    res.locals.helper = helper;
    res.locals.current_path = req.path;
    res.locals.auth_user = req.session.auth_user || {};
    res.locals.auth_menu = [
        {
            'name': '游戏管理',
            'url': '/admin/game',
            'childs': [
                {
                    'name': '列表',
                    'url': '/admin/game/',
                    'childs': []
                },
                {
                    'name': '评论',
                    'url': '/admin/game/platform',
                    'childs': []
                },
                {
                    'name': '分类',
                    'url': '/admin/game/platform',
                    'childs': []
                },
                {
                    'name': '平台',
                    'url': '/admin/game/platform',
                    'childs': []
                }
            ]
        },
        {
            'name': '用户管理',
            'url': '/admin/user',
            'childs': []
        }
    ];
    //req.session.auth_user = {
    //    '_id': 1,
    //    'username': 'admin',
    //    'email': 'admin@admin.com',
    //    'mobile': '10000'
    //};
    req.next();
};


/* url: /admin */
exports.index = function (req, res) {

    res.render('admin/default/index', {
        'title': 'index'

    });

};


/* GET: /admin/login */
exports.login = function (req, res) {

    var errors = {};
    var form = {
        username: req.param('username') || '',
        password: req.param('password') || ''
    };

    if (req.method === 'POST') {

        req.check('username', '用户名不能为空').notEmpty();
        req.check('password', '密码不能为空').notEmpty();

        async.series([
            function (callback) {
                errors = req.validationErrors(true);
                callback(errors);
            },
            function (callback) {
                User.find({username: form.username, password: form.password}, function (err, user) {
                    if (!err && user.length > 0) {
                        callback(true, user);
                    } else {
                        errors = {
                            'password': {
                                param: 'password',
                                msg: '用户名或密码错误',
                                value: ''
                            }
                        };
                        callback(false);
                    }
                });
            }
        ], function (err, result) {
            res.render('admin/default/login', {
                'title': '管理面板',
                'errors': errors,
                'form': form
            });
        });
        return;
    }

    res.render('admin/default/login', {
        'title': '管理面板',
        'errors': errors,
        'form': form
    });
};

