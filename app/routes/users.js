'use strict';
//var users = global.nss.db.collection('users');
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.loadLogin = (req, res)=>{
  res.render('users/login', {title: 'LearnEd: login'});
};

exports.loadRegister = (req, res)=>{
  res.render('users/register', {title: 'LearnEd: register'});
};

exports.register = (req, res)=>{
  var user = new User(req.body);
  user.register(user=>{
    if(user){
      req.session.userId = user._id;
    }else{
      req.session.userId = null;
    }
    if(user.type === 'teacher'){
      res.redirect('/users/teacher');
    }else{
      res.redirect('/users/student');
    }

  });
};

//

exports.login = (req, res)=>{
  //var loginData = {email: req.body.email, password: req.body.password};
  User.findByUserEmail(req.body.email, user=>{
    console.log(user);
    user.login(req.body.password, userData=>{
      if(userData.type === 'teacher'){
        res.redirect('/users/teacher');
      }
      else{
        res.redirect('/users/student');
      }
    });
  });
};// end login

exports.logout = (req, res)=>{
  req.session.destroy();
  res.redirect('/');
};// end logout
