var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = module.exports = express();

var engine = require('ejs-locals');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var upload = require('multer');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/website');
mongoose.set('debug', true);

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(upload({desc: path.join(__dirname, 'public/uploads')}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    secret: 'what',
    store: new MongoStore({
        db: 'website'
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes');

//app.disable('etag');
app.listen(port);
console.log('server listen on port ' + port);