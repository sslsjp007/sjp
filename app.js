var express = require('express');
var mongoose =require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var apiRouter = require('./routers/apiRouter.js');
var pageRouter = require('./routers/pageRouter.js');


var app = express();


var hostName = 'localhost';


var port = 6654;

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api',apiRouter);
app.use('/page',pageRouter);

app.use((req,res) => {
	if(req.url === '/favicon.ico'){
		return;
	}else{
		res.redirect('/page/index');
	}
})

mongoose.connect('mongodb://localhost:27017/wabao',(err) => {
	if(err){
		console.log('数据库开启失败');
	}else{
		console.log('数据库开启成功');
		app.listen(port,hostName,(err) => {
			if(err){
				console.log('服务器开启失败');
			}else{
				console.log('服务器开启成功');
			}
		});
	}
});