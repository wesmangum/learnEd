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
    debugger;
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
};// end register

//

exports.login = (req, res)=>{
  User.findByUserEmail(req.body.email, user=>{
    console.log(user);
    req.session.userId = user._id.toString();
    user.login(req.body.password, match=>{
      console.log('MATCHY MATCH');
      console.log(match);
      if(match){
        if(user.type === 'teacher'){
          res.redirect('/users/teacher');
        }
        else{
          res.redirect('/users/student');
        }
      }
      else{
        res.redirect('/');
      }

    });
  });
};// end login

exports.logout = (req, res)=>{
  req.session = null;
  res.redirect('/');
};// end logout
