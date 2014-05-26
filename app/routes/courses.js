/* jshint unused:false*/
'use strict';
//var users = global.nss.db.collection('users');
var courses = global.nss.db.collection('courses');
var users = global.nss.db.collection('users');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Mongo = require('mongodb');
var _ = require('lodash');
var async = require('async');

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
    User.findByUserId(req.session.userId, user=>{
      res.render(`courses/${user.type}/course`, {course: course});
    });
  });
};

exports.bookmark = (req, res)=>{
  User.findByUserId(req.session.userId, response=>{
    async.each(response.courses, (c, callback)=>{
      if(c.courseId === req.params.courseId){
        callback(true);
      }else{
      callback(false);
      }}, isPresent=>{
        if(!isPresent){
          response.courses.push({courseId: req.params.courseId, score: 0});
          users.save(response, (err, user)=>{
            res.send('Added to Bookmarks');
          });
        }else{
          res.send('Already Bookmarked');
        }
      }
    );
  });
};




exports.loadCourseForm = (req, res)=>{
  res.render('courses/course', {title: 'Add Course'});
};

exports.index = (req, res)=>{
  courses.find().toArray((err, result)=>{
    User.findByUserId(req.session.userId, user=>{
      res.render('courses/index', {courses: result});
      //YOU ARE HERE
    });
  });
};


exports.courseForm = (req, res)=>{
  res.render('courses/courseSnippet');
};
