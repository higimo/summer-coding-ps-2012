var app = require('http').createServer(handler)
  , io = require('./socket.io').listen(app)
  , fs = require('fs')

app.listen(81);

function handler(req, res) 
{
    var pattern = /\/js\/(.+)\.js/;
    if ( pattern.test( req.url ) )
    {
        readFile( req.url, res );
        return;
    }

    readFile( '/index.html', res );
}

function readFile( fileName, res )
{
  fs.readFile(__dirname + fileName,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});