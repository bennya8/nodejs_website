var mongoose = require('mongoose');

var GameCommentSchema = new mongoose.Schema({
    game: {
        type: ObjectId,
        ref: 'Game'
    },
    from: {
        type: ObjectId,
        ref: 'User'
    },
    reply: [{
        form: {
            type: ObjectId,
            ref: 'User'
        },
        to: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    content: String,
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

GameCommentSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

var GameComment = mongoose.model('Game', GameCommentSchema);

module.exports = GameComment;