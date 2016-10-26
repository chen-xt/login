var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录' });
});

router.post('/doLogin', function(req, res, next) {
  var user = {userid:'chen' , password:'123'} ;	// 固定数据
	if (req.body.userid==user.userid && req.body.password==user.password) {
		res.redirect("/welcome?uid=" + req.body.userid) ;	// 地址重写
	}else{
	res.redirect("/login") ;
	}
});

router.get('/logout', function(req, res, next) {
  res.render('login', { title: '用户注销' });
});

router.get('/welcome', function(req, res, next) {
  // 如果是地址栏参数使用req.query.参数名称接收
	var user = {  userid : req.query.uid 	}
    res.render('welcome', { title: '程序首页' , user:user });
});

module.exports = router;





