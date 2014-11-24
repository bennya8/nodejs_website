var app = require('../app');

/**
 * Frontend Routes
 */
var homeDefault = require('./home/default');
app.get('/', homeDefault.index);
app.get('/type/:slug', homeDefault.type);
app.get('/platform/:slug', homeDefault.platform);
app.get('/game/:slug', homeDefault.game);
app.get('/search/:keyword', homeDefault.search);

/**
 * Backend Routes
 */
/* default controller */
var adminDefault = require('./admin/default');
app.get('/admin/login', adminDefault.login);
app.post('/admin/login', adminDefault.login);
app.use(adminDefault.authorize);
app.post('/admin/attachments', adminDefault.attachments);
app.get('/admin', adminDefault.index);

/* game controller */
var adminGame = require('./admin/game');
/* game actions */
app.get('/admin/game', adminGame.index);
app.get('/admin/game/add', adminGame.add);
app.post('/admin/game/add', adminGame.add);
app.get('/admin/game/edit', adminGame.edit);
app.post('/admin/game/edit', adminGame.edit);
app.post('/admin/game/del', adminGame.del);
/* game type actions */
app.get('/admin/game/type', adminGame.type);
app.get('/admin/game/type/add', adminGame.typeAdd);
app.post('/admin/game/type/add', adminGame.typeAdd);
app.get('/admin/game/type/edit', adminGame.typeEdit);
app.post('/admin/game/type/edit', adminGame.typeEdit);
app.post('/admin/game/type/del', adminGame.typeDel);
/* game platform actions */
app.get('/admin/game/platform', adminGame.platform);
app.get('/admin/game/platform/add', adminGame.platformAdd);
app.post('/admin/game/platform/add', adminGame.platformAdd);
app.get('/admin/game/platform/edit', adminGame.platformEdit);
app.post('/admin/game/platform/edit', adminGame.platformEdit);
app.post('/admin/game/platform/del', adminGame.platformDel);
/* game comment actions */
app.get('/admin/game/comment', adminGame.comment);

/* user controller */
var adminUser = require('./admin/user');
app.get('/admin/user', adminUser.index);
app.get('/admin/user/add', adminUser.add);
app.post('/admin/user/add', adminUser.add);
app.get('/admin/user/edit', adminUser.edit);
app.post('/admin/user/edit', adminUser.edit);
app.post('/admin/user/del', adminUser.del);