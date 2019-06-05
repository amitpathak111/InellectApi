
var express = require('express');
var router = express.Router();

router.post('/',function(req,res){

	res.send("add trades")
})

router.get('/',function(req,res){

	res.send("get trades")
})

router.get('/users/:userID',function(req,res){

	res.send("user trade detail")
});
/************export function************/
module.exports = router;