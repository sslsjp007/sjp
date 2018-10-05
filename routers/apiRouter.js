var express = require('express');
var UserModel = require('../models/users.js');
var BoxModel = require('../models/boxes.js');
var GoodModel = require('../models/goods.js');
var {randomAddGood}  = require('../src/base.js');
var router = express.Router();

router.post('/reg',(req,res) => {
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	if(username === ''){
		res.send('<script>alert("用户名不能为空！！！请重新填写。。。");history.back();</script>');
	}else if(password === '' || password2 === ''){
		res.send('<script>alert("密码不能为空！！！请重新填写。。。");history.back();</script>');
	}else if(password !== password2){
		res.send('<script>alert("两次密码不一致！！！请重新填写。。。");history.back();</script>');	
	}

	UserModel.findOne({
		username:username
	}).then((info) => {
		if(info){
			res.send('<script>alert("用户名已被注册！！！请重新填写。。。");history.back();</script>');
		}else{
			UserModel({
				username:username,
				password:password
			}).save().then((info) => {
				if(info){
				res.send('<script>alert("恭喜您！注册成功！！！");window.location="/page/login";</script>');
					
				}
			})

		}
	})

});

router.post('/login',(req,res) => {
	var username = req.body.username;
	var password = req.body.password;

	if(username === ''){
		res.send('<script>alert("用户名为空！！！请重新填写。。。");history.back();</script>');
	}else if(password === ''){
		res.send('<script>alert("密码为空！！！请重新填写。。。");history.back();</script>');

	}
	UserModel.findOne({
		username:username,
		password:password
	}).then((info) => {
		if(info){
			var date = new Date();
			date.setDate(date.getDate() + 3);
			res.cookie('userid',JSON.stringify({_id:info._id}),{expires:date});
			res.send('<script>alert("登陆成功");window.location="/page/index"</script>');
		}else{
			res.send('<script>alert("登陆失败！！！用户名或者密码错误");history.back();</script>');
		}
	})
})


router.get('/logout',(req,res) => {
	res.clearCookie('userid');
	res.redirect('/page/index')
})


router.get('/createBox',(req,res) => {
	console.log(req.query);
	var number = req.query.number;
	var result = [];

	BoxModel.deleteMany({}).then(()=>{

		for(var i = 0; i < number;i++){
			var promise = new Promise((resolve,reject) => {
				BoxModel({
					isCheck:false
				}).save().then((info) => {
					
						resolve();

				})
			});
			result.push(promise)
		}
		Promise.all(result).then(() => {
			res.send(JSON.stringify({
				
				code:0 

			}))
		})
	})
})


router.get('/addGood',(req,res) => {
	console.log(req.query.good)
	var good = req.query.good;
	GoodModel.findOne().then((info) => {
		if(info){
			info.goods.push(good);
			info.goods = Array.from(new Set(info.goods));
			
			GoodModel.updateMany({},{$set:{goods:info.goods}}).then((info) => {
				res.send(JSON.stringify({
					code:0
				}))
			})
		}else{
			GoodModel({
				goods:[good]
			}).save().then((info) => {
				res.send(JSON.stringify({
					code:0
				}))
			})
		}
	})
})


router.get('/removeGood',(req,res) => {
	var deleteGood = req.query.deleteGood;
	GoodModel.findOne().then((info) => {
		var goods = info.goods;
		for(var i = 0;i < goods.length;i++){
			if(goods[i] === deleteGood){
				goods.splice(i,1);
			}
		}
		GoodModel.updateMany({},{$set:{goods:goods}}).then((info) => {
			if(info){
				res.send(JSON.stringify({
					code:0
				}))
			}else{
				res.send(JSON.stringify({
						code:1
					}))
			}
			
		})
			

	})
	
})

router.get('/winning',(req,res) => {
	var _id = req.query._id;
	BoxModel.updateMany({_id:_id},{$set:{isCheck:true}}).then((info) => {
		GoodModel.findOne().then((info) => {
			var good = randomAddGood(info.goods);
			res.send(JSON.stringify({
				code:0,
				good:good
			}))
		})
		
		
	})

})
module.exports = router;