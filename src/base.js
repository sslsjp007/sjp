
function isSkipLogin(req,res) {
	var userid = req.cookies.userid;
	if(!userid){
		res.redirect('/page/index');
	}
}

function randomAddGood(arr){
	return arr[Math.floor(Math.random()*arr.length)]
}


module.exports = {
	isSkipLogin,
	randomAddGood
}