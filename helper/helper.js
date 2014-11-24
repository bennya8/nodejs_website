var moment = require('moment');

var helper = {

    formatGMT: function (str) {
        return moment(str).format('YYYY-MM-DD');
    }

};

module.exports = helper;