var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var GameSchema = new Schema({
    name: String,
    slug: String,
    type: {
        type: ObjectId,
        ref: 'Type'
    },
    platform: [{
        type: ObjectId,
        ref: 'Platform'
    }],
    publisher: String,
    developer: String,
    cover: String,
    releaseAt: Date,
    isRecommend: {
        type: Boolean,
        default: false
    },
    totalComment: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

GameSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

GameSchema.statics = {
    fetch: function (cb) {
        return this.find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (cb) {
        return this.findOne({_id: id})
            .exec(cb);
    },
    getRecommendList: function (cb) {
        return this.find({
            isRecommend: true
        }).exec(cb);
    },
    getHotList: function (cb) {
        return this.find({})
            .sort({field: 'desc', totalComment: -1})
            .exec(cb);
    }
};

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;