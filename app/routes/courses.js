/* jshint unused:false*/
'use strict';
//var users = global.nss.db.collection('users');
var courses = global.nss.db.collection('courses');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var Mongo = require('mongodb');


exports.create = (req, res)=>{
  var courseObject = {teacherId: req.session.userId, description: req.body.description, title: req.body.title};
  //body needs to have teacherId, description, title
  var course = new Course(courseObject);
  courses.save(course, (error, course)=>{
    //Course.findAllByTeacherId(course.teacherId, (error, courses)=>{
      res.render('courses/showCourse', {course: course});
  //  });
  });
};

exports.loadCourseForm = (req, res)=>{
  res.render('courses/courseSnippet', {title: 'Add Course'});
};
