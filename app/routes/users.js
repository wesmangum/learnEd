/* jshint unused:false*/
'use strict';

var users = global.nss.db.collection('users');
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Mongo = require('mongodb');


// exports.loadLogin = (req, res)=>{
//   res.render('users/login', {title: 'LearnEd: login'});
// };

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
      res.render('users/teacher', {user: user});

    }else{
      res.render('users/student', {user: user});
    }
  });
};// end register

//

exports.login = (req, res)=>{
  User.findByUserEmail(req.body.email, user=>{
    req.session.userId = user._id.toString();
    user.login(req.body.password, match=>{
      if(match){
        if(user.type === 'teacher'){
          res.render(`users/teacher`, {user: user});
        }
        else{
          res.render(`users/student`, {user: user});
        }
      }
      else{
        res.redirect('/');
      }

    });
  });
};// end login


exports.logout = (req, res)=>{
  req.session.userId = null;
  res.redirect('/');
};// end logout

exports.dashboard = (req, res)=>{
};// end logout
