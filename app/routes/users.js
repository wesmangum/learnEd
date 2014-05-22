'use strict';

exports.loadLogin = (req, res)=>{
  res.render('users/login', {title: 'LearnEd: login'});
};

exports.loadRegister = (req, res)=>{
  res.render('users/register', {title: 'LearnEd: register'});
};

exports.register = (req, res)=>{

};

exports.login = (req, res)=>{
  
};
