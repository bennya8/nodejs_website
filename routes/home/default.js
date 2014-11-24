var _ = require('underscore');
var async = require('async');
var Game = require('../../models/game');
var Type = require('../../models/type');
var Platform = require('../../models/platform');

// url: / (GET)
exports.index = function (req, res) {
    async.series([
        function (callback) {
            Type.find({}).exec(callback);
        },
        function (callback) {
            Platform.find({isShow:true})
                .sort({name:-1})
                .exec(callback);
        },
        function (callback) {
            Game.getRecommendList(callback);
        },
        function (callback) {
            Game.getHotList(callback);
        }
    ], function (err, result) {
        console.log(result[2]);
        res.render('home/default/index', {
            'title': '游戏',
            'types': result[0],
            'platforms' : result[1],
            'recommend_list': result[1],
            'hot_list': result[2]
        });
    });
};

// url: /type/:slug (GET)
exports.type = function (req, res) {


    res.render('home/default/type', {
        'title': '游戏类型'
    });
};

// url: /platform/:slug (GET)
exports.platform = function (req, res) {

    res.render('home/default/platform', {
        'title': '游戏平台'
    });
};

// url: /game/:slug (GET)
exports.game = function (req, res) {

    res.render('home/default/game', {
        'title': '游戏介绍'
    });
};

// url: /search/:keyword (GET)
exports.search = function (req, res) {

    res.render('home/default/search', {
        'title': '搜索页'
    });
};
