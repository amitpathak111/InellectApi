
  const express = require('express');
  const bodyParser = require('body-parser');
  const logger = require('morgan');
  const http = require('http');
  const tradeHandler = require('./repository/trade_handler.js');
  const stockHandler = require('./repository/stock_data_handler.js');

  const app = express();

  app.set('port', process.env.PORT || 9020);
  app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
  app.use(bodyParser.json());                        
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logger('dev'));;

  app.use('/trades', tradeHandler);
  app.use('/stocks', stockHandler);


app.delete('/erase',function(req,res) {

	res.send("erase")

});





http.createServer(app).listen(app.get('port'), function () {
    console.log(" Server Ready To listen On IP " + app.get('ipaddr') + " Port " + app.get('port'));
});
