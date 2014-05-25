/* jshint unused:false*/
'use strict';
//var users = global.nss.db.collection('users');
var courses = global.nss.db.collection('courses');
var users = global.nss.db.collection('users');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Mongo = require('mongodb');


exports.create = (req, res)=>{
  var courseObject = {teacherId: req.session.userId, description: req.body.description, title: req.body.title};
  var course = new Course(courseObject);
  courses.save(course, (error, course)=>{  
    User.findByUserId(req.session.userId, user=>{
      user.courses.push(course._id);
      users.save(user, ()=>{
        res.redirect(`/courses/show/${course._id}`);
      });
    });   
  });
};

exports.show = (req, res)=>{
  Course.findByCourseId(req.params.id, course=>{
    console.log(course);
    res.render('courses/course', {course: course});
  });
};

exports.loadCourseForm = (req, res)=>{
  res.render('courses/course', {title: 'Add Course'});
};


exports.courseForm = (req, res)=>{
  res.render('courses/courseSnippet');
};
