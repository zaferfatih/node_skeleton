var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  //localhost
   db = mongoose.connect('mongodb://admin:pass@localhost:27017/somedb');

var app = express(),
    request = require('request');

//notifications
var agent = express.Router(), device = require('./node_modules/device');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/goal').with(app, db, mongoose);

// require('./routes/foursquare').with(app, db, mongoose, request);
// require('./routes/feature').with(app, db, mongoose);
// require('./routes/goal_detail').with(app, db, mongoose);
// require('./routes/user').with(app, db, mongoose);
// require('./routes/goal').with(app, db, mongoose);
// require('./routes/alarms').with(app, db, mongoose);
// require('./routes/user_goal_setting').with(app, db, mongoose);
// require('./routes/user_goal_period').with(app, db, mongoose);
// require('./routes/user_goal_data').with(app, db, mongoose);
// require('./routes/init').with(app, db, mongoose);
// require('./routes/_header').with();
// require('./routes/notifications').with(app, db, mongoose);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
