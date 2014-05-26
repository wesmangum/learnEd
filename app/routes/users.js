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

exports.getCourses = (req, res)=>{
  var userId = req.session.userId;
  User.findByUserId(userId, user=>{
    var courses = user.courses.map(c=>c.courseId);
    Course.findCourses(courses, result=>{
      var courseInfo = [];
      for(var i = 0; i < result.length; i++){
        var courseObj = {title: result[i].title, description: result[i].description, score: user.courses[i].score, id: result[i]._id.toString()};
        courseInfo.push(courseObj);
      }
      res.render('courses/student/courseList', {courses: courseInfo}, (error, html)=>{
        res.send(html);
      });
    });
  });

};// end getCourses

exports.dashboard = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    if(!user){
      res.redirect('/');
    }else if(user.type === 'student'){
      //change the render url
      res.render(`users/student`, {user: user});
    }else if(user.type === 'teacher'){
      //change the render url
      res.render(`users/teacher`, {user: user});
    }
  });
};// end logout
