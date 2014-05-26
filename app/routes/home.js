'use strict';

exports.index = (req, res)=>{

  var isLogin = !!req.session.userId;

  console.log('LOGIN');
  console.log(isLogin);

  res.render('home/index', {isLogin:req.session, title: 'LearnEd'});
};
