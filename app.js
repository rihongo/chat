
// declaration
var express = require('express');
var app = express()
    , http = require('http').createServer(app)
    , io = require('socket.io').listen(http)
    , routes = require('./routes')
    , user = require('./routes/user')
    , chat = require('./routes/chat')
    , path = require('path');

// configuration
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    //app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chat', chat.list);

// http listen
http.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// socket connection event on
var chat = io
    .of('/chat')
    .on('connection', function(socket) {
        console.log('>>> chat server connection');

        socket.on('msg', function(data) {
            console.log('>>> data : ' + data.name + ', ' + data.msg);
            chat.emit('new', data);
        });
})
