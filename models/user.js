var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    role : Number,
    password: String,
    salt: String,
    nickname: String,
    mobile: String,
    email: String,
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

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;