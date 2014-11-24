var _ = require('underscore');
var async = require('async');
var moment = require('moment');
var Game = require('../../models/game');
var Type = require('../../models/type');
var Platform = require('../../models/platform');

/**
 * Game Actions
 */
/* URL: /admin/game (GET) */
exports.index = function (req, res) {
    var form = {
        page: req.param('page') || 1,
        size: req.param('size') || 10
    };
    async.series([
        function (callback) {
            Game.find({})
                .populate('platform', 'name')
                .populate('type', 'name')
                .skip((form.page - 1) * form.size)
                .limit(form.size)
                .sort({})
                .exec(callback);
        },
        function (callback) {
            Game.count({}).exec(callback);
        }
    ], function (err, result) {
        console.log(result[0]);
        res.render('admin/game/index', {
            'title': '游戏管理',
            'form': form,
            'games': result[0],
            'count': Math.ceil((result[1] / form.size))
        });
    });
};
/* URL: /admin/game/add (GET/POST) */
exports.add = function (req, res) {
    var form = {
        title: req.param('title') || '',
        type: req.param('type') || '',
        platform: req.param('platform') || '',
        publisher: req.param('publisher') || '',
        developer: req.param('developer') || '',
        cover: req.param('cover') || '',
        releaseAt: req.param('releaseAt') || ''
    };
    async.series([
        function (callback) {
            Type.find({}).exec(callback);
        },
        function (callback) {
            Platform.find({}).exec(callback);
        }
    ], function (err, result) {
        var errors;
        var assign = {
            'title': '添加游戏',
            'errors': errors,
            'form': form,
            'types': result[0],
            'platforms': result[1]
        };
        if (req.method === 'POST') {
            req.check('title', '游戏名不能为空').notEmpty();
            req.check('type', '至少选择一个游戏类型').notEmpty();
            req.check('platform', '至少选择一个游戏平台').notEmpty();
            req.check('publisher', '发行商不能为空').notEmpty();
            req.check('developer', '开发商不能为空').notEmpty();
            req.check('cover', '封面不能为空').notEmpty();
            req.check('releaseAt', '发售日期不能为空').notEmpty();
            async.series([
                function (callback) {
                    assign.errors = req.validationErrors();
                    callback(assign.errors);
                },
                function (callback) {
                    var game = new Game(form);
                    game.save(callback);
                }
            ], function (err, result) {
                if (!err) {
                    res.redirect('/admin/game');
                } else {
                    res.render('admin/game/add', assign);
                }
            });
        } else {
            res.render('admin/game/add', assign);
        }
    });
};
/* URL: /admin/game/edit (GET/POST) */
exports.edit = function (req, res) {

    var errors;
    var id = req.param('id');
    var form = {
        title: req.param('title') || '',
        type: req.param('type') || '',
        platform: req.param('platform') || '',
        publisher: req.param('publisher') || '',
        developer: req.param('developer') || '',
        cover: req.param('cover') || '',
        releaseAt: req.param('releaseAt') || ''
    };

    async.series([
        function (callback) {
            Game.findOne({_id: id}).exec(callback);
        },
        function (callback) {
            Type.find({}).exec(callback);
        },
        function (callback) {
            Platform.find({}).exec(callback);
        }
    ], function (err, result) {
        if (err) {
            return res.redirect('/admin/game');
        }
        var errors;
        var game = result[0];
        var assign = {
            'title': '编辑游戏',
            'errors': errors,
            'form': form,
            'id': id,
            'types': result[1],
            'platforms': result[2]
        };

        if (req.method === 'POST') {
            req.check('title', '游戏名不能为空').notEmpty();
            req.check('type', '游戏类型不能为空').notEmpty();
            req.check('publisher', '发行商不能为空').notEmpty();
            req.check('developer', '开发商不能为空').notEmpty();
            req.check('cover', '封面不能为空').notEmpty();
            req.check('releaseAt', '发售日期不能为空').notEmpty();

            async.series([
                function (callback) {
                    assign.errors = req.validationErrors();
                    callback(assign.errors);
                },
                function (callback) {
                    game = _.extend(game, form);
                    game.save(function (err) {
                        callback(err);
                    });
                }
            ], function (err, result) {
                if (!err) {
                    res.redirect('/admin/game');
                } else {
                    res.render('admin/game/edit', assign);
                }
            });
        } else {
            form = _.extend(form, game._doc);
            res.render('admin/game/edit', assign);
        }
    });
};
/* URL: /admin/game/del (POST) */
exports.del = function (req, res) {
    var id = req.param('id');
    async.series([
        function (callback) {
            Game.findOne({_id: id}).exec(callback);
        }
    ], function (err, result) {
        if (err) {
            res.redirect('/admin/game/del');
        }
    });
};

/**
 * Game Comment Actions
 */
exports.comment = function (req, res) {


    res.render('admin/game/comment');
};

/**
 * Game Type Actions
 */
exports.type = function (req, res) {

    Type.find({}, function (err, result) {
        res.json(result);
    });
};

exports.typeAdd = function (req, res) {


};

exports.typeEdit = function (req, res) {

};
exports.typeDel = function (req, res) {

};

/**
 * Game Platform Actions
 */
exports.platform = function (req, res) {

    var form = {
        page: req.param('page') || 1,
        size: req.param('size') || 10
    };

    async.series([
        function (callback) {
            Platform.find({}).sort({createAt: 1}).limit(form.size).exec(callback);
        },
        function (callback) {
            Platform.count({}).exec(callback);
        }
    ], function (err, result) {
        res.render('admin/game/platform', {
            'title': '游戏管理',
            'form': form,
            'platforms': result[0],
            'total': result[1]
        });
    });
};

exports.platformAdd = function (req, res) {

};

exports.platformEdit = function (req, res) {

};

exports.platformDel = function (req, res) {

};



