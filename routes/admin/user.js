var _ = require('underscore');
var async = require('async');
var bcrypt = require('bcrypt');
var User = require('../../models/user');

/* url: /admin/user */
exports.index = function (req, res) {

    var form = {
        pIndex: req.param('pIndex') || 1,
        pSize: req.param('pSize') || 10
    };

    async.series([
        function (callback) {
            User.find({})
                .skip((form.pIndex - 1) * form.pSize)
                .limit(form.pSize)
                .exec(callback);
        }
    ], function (err, result) {
        res.render('admin/user/index', {
            'title': '用户管理',
            'users': result[0],
            'form': form
        });
    });

};

exports.add = function (req, res) {

    var errors;

    var form = {
        username: req.param('username') || '',
        password: req.param('password') || '',
        repassword: req.param('repassword') || '',
        salt: '',
        nickname: req.param('nickname') || '',
        mobile: req.param('mobile') || '',
        email: req.param('email') || ''
    };

    if (req.method === 'POST') {

        req.check('username', '用户名不能为空').notEmpty();
        req.check('password', '密码不能为空').notEmpty();
        req.check('repassword', '确认密码不能为空').notEmpty();
        req.check('nickname', '昵称不能为空').notEmpty();
        req.check('mobile', '手机不能为空').notEmpty();
        req.check('email', '邮箱不能为空').notEmpty();

        async.series([
            function (callback) {
                errors = req.validationErrors();
                callback(errors);
            },
            function (callback) {
                var user = new User(form);
                user.salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, user.salt);
                user.save(function (err) {
                    callback(err);
                });
            }
        ], function (err, result) {
            if (!err) {
                res.redirect('/admin/user');
            } else {
                res.render('admin/user/add', {
                    'title': '添加用户',
                    'errors': errors,
                    'form': form
                });
            }
        });
        return;
    }

    res.render('admin/user/add', {
        'title': '添加用户',
        'errors': errors,
        'form': form
    });
};

exports.edit = function (req, res) {
    res.render('admin/user/edit', {
        'title': 'index'
    });
};

exports.del = function (req, res) {

    res.render('admin/user/index', {
        'title': 'index'
    });

};