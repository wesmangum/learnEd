/* jshint unused:false*/
'use strict';

var users = global.nss.db.collection('users');
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var Mongo = require('mongodb');

exports.loadRegister = (req, res)=>{
  res.render('users/register', {title: 'LearnEd: register'});
};

exports.getLinks = (req, res)=>{
  var userId = req.session.userId;
  Course.findAllByTeacherId(userId, courses=>{
    res.render('users/teachers/courseLinks', {courses: courses}, (err, response)=>{
      res.send(response);
    });
  });
};

exports.register = (req, res)=>{
  var user = new User(req.body);
  user.registerUser(user=>{
    if(user){
      req.session.userId = user._id;
    }else{
      req.session.userId = null;
    }
    res.redirect('/users/dashboard');
  });
};// end register

exports.login = (req, res)=>{
  var user = new User(req.body);
  user.login(user=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('/users/dashboard');
    }
    else{
      res.redirect('/');
    }
  });
};// end login

exports.logout = (req, res)=>{
  req.session = null;
  res.redirect('/');
};// end logout

exports.dashboard = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    if(!user){
      res.redirect('/');
    }else if(user.type === 'student'){
      res.render(`users/student`, {user: user});
    }else if(user.type === 'teacher'){
      res.render(`users/teacher`, {user: user});
    }
  });
};// end logout
