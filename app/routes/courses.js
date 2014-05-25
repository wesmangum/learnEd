/* jshint unused:false*/
'use strict';
//var users = global.nss.db.collection('users');
var courses = global.nss.db.collection('courses');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Mongo = require('mongodb');


exports.create = (req, res)=>{
  var courseObject = {teacherId: req.session.userId, description: req.body.description, title: req.body.title};
  var course = new Course(courseObject);
  courses.save(course, (error, course)=>{
    courses.find({teacherId: req.session.userId}).toArray((error, courses)=>{
      User.findByUserId(req.session.userId, user=>{
        res.render('users/teacher', {courses: courses, user:user});

      });
    });
  });
};

exports.loadCourseForm = (req, res)=>{
  res.render('courses/course', {title: 'Add Course'});
};


exports.courseForm = (req, res)=>{
  res.render('courses/courseSnippet');
};
