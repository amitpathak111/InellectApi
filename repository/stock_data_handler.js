
var express = require('express');
var router = express.Router();
var config = require("./config.js");

///input ->stockname ,tradetype ,start and end tradetime
//return  data based of stockname ,tradetype and tradetime
//ordered by tradeid...will return status code 404
 //when no trade exits for that symbol

router.get('/:stockSymbol/trades',function(req,res){

	let queryData = req.query ;

	config.trades_col.find({'symbol' : req.params.stockSymbol }, function(err, trades){

		if(err || trades.length == 0){

			res.status('404').send("There are no trades for stock");

		}else{

			queryData.start = new Date(queryData.start)
			queryData.end = new Date(queryData.end)

			var filteredTrade =  trades.filter(function(trade) {
				return trade.type == queryData.type
				 	trade.timestamp >= queryData.start &&
         			trade.timestamp < queryData.end ;
			});	

			filteredTrade.sort(function(a, b){
  				return a.id > b.id;
			});
			 
  			res.status('200').send(filteredTrade);
		
  		}

  	}); 	
});


router.get('/:stockSymbol/price',function(req,res){

	
	let queryData = req.query ;

	config.trades_col.find({'symbol' : req.params.stockSymbol },{
		_id : 0,
		price : 1

		}, function(err, trades){

		if(err || trades.length == 0){
			
			res.status('404').send( {
				"message":"There are no trades in the given date range"
					});

		}else{

			queryData.start = new Date(queryData.start)
			queryData.end = new Date(queryData.end)

			var finalData = {};

			finalData.symbol = req.params.stockSymbol ;

			var filteredTrade =  trades.filter(function(trade) {
				return trade.timestamp >= queryData.start &&
         				trade.timestamp < queryData.end ;
			});

			finalData.min = Math.min.apply(null, filteredTrade.map(item => item.price)),
		    finalData.max = Math.max.apply(null, filteredTrade.map(item => item.price));
			 
  			res.status('200').send(finalData);
		
  		}

  	}); 	

});
/************export function************/
module.exports = router;

