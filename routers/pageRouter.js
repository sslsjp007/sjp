var express = require('express');
var UserModel = require('../models/users.js');
var BoxModel = require('../models/boxes.js');
var GoodModel = require('../models/goods.js');
var { isSkipLogin } = require('../src/base.js');
var router = express.Router();

router.get('/index',(req,res) => {
	var userid = JSON.parse(req.cookies.userid || '{}');

	if(userid._id){

		UserModel.findOne({
			_id:userid._id
		}).then((info) => {
			if(info){
				res.render('index',{
					isLogin:true,
					username:info.username
				})

			}else{
				res.render('index',{
					isLogin:false,
					username:''
				})
			}
		})

	}else{
		
		res.render('index',{
			isLogin:false,
			username:''
		})
	}

})

router.get('/login',(req,res) => {
	res.render('login')
})


router.get('/reg',(req,res) => {
	res.render('reg')
})

router.get('/play',(req,res) => {

	isSkipLogin(req,res);
	BoxModel.find().then((info) => {
		if(info){
			res.render('play',{
				boxList:info
			});			
		}else{
			res.render('play',{
				boxList:[]
			})
		}


	})
})

router.get('/info',(req,res) => {
	isSkipLogin(req,res)
	res.render('info')
})

router.get('/admin',(req,res) => {
	GoodModel.findOne().then((info) => {
		if(info){

			res.render('admin',{
				goodList:info.goods
			})
			
		}else{
			res.render('admin',{
				goodList:[]
			})
		}
	})
})


module.exports = router;