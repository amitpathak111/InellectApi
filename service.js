
  var express = require('express')
  , bodyParser = require('body-parser')
  , logger = require('morgan')
  , http = require('http');

var app = express();

  app.set('port', process.env.PORT || 9020);
  app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
  app.use(bodyParser.json());                        
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logger('dev'));;



app.delete('/erase', function (req, res) {

	res.send("erase")

});

app.post('/trades',function(req,res){

	res.send("add trades")
})

app.get('/trades',function(req,res){

	res.send("get trades")
})

app.get('/trades/users/:userID',function(req,res){

	res.send("user trade detail")
});

app.get('/stocks/:stockSymbol/trades',function(req,res){

  	res.send('200')
});


app.get('/stocks/:stockSymbol/price',function(req,res){

	res.send('200')

});


http.createServer(app).listen(app.get('port'), function () {
    console.log(" Server Ready To listen On IP " + app.get('ipaddr') + " Port " + app.get('port'));
});
