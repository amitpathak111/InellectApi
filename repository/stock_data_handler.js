
var express = require('express');
var router = express.Router();

router.get('/:stockSymbol/trades',function(req,res){

  	res.send(req.query)
});


router.get('/:stockSymbol/price',function(req,res){

	res.send(req.query)

});
/************export function************/
module.exports = router;