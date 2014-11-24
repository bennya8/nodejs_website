var mongoose = require('mongoose');

var PlatformSchema = new mongoose.Schema({
    name: String,
    desc: String,
    slug: String,
    isShow: {
        type: Boolean,
        default: false
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

PlatformSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('Platform', PlatformSchema);