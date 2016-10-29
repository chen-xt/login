var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // 导入组件
var models = require('./models'); 	// 导入自定义组件
var User = models.User; //使用User模型，对应的users表
mongoose.connect('mongodb://localhost/mldndb'); //连接数据库

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录' });
});

/*router.post('/doLogin', function(req, res, next) {
  var user = {userid:'chen' , password:'123'} ;	// 固定数据
	if (req.body.userid==user.userid && req.body.password==user.password) {
		res.redirect("/welcome?uid=" + req.body.userid) ;	// 地址重写
	}else{
	res.redirect("/login") ;
	}
});*/
router.post('/doLogin', function(req, res, next) {
    var query_doc = {userid:req.body.userid , password:req.body.password} ;	// 固定数据
	User.count(query_doc,function(err,doc){// 直接利用mongodb的命令进行操作
		if(doc == 0) {	// 输入错误，没有此信息
			res.redirect("/login") ;
		} 
		else {	// 成功
			res.redirect("/welcome?uid=" + req.body.userid) ;	// 地址重写
		}
	});
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





