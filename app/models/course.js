'use strict';
//var users = global.nss.db.collection('users');
var courses = global.nss.db.collection('courses');
//var bcrypt = require('bcrypt');
var Mongo = require('mongodb');
//var _ = require('lodash');


class Course{
  constructor(object){
    this.teacherId = object.teacherId;
    this.description = object.description;
    this.title = object.title;
  }


  static findByCourseId(id, func){
    id = Mongo.ObjectID(id);
    courses.findOne({_id: id}, (error, result)=>{

      func(result);
    });
  }// end gindByUserId

  static findAllByTeacherId(id, func){
    id = Mongo.ObjectID(id);
    courses.find({teacherId: id}).toArray((error, courses)=>{
      func(courses);
    });
  }// end gindByUserId



}//end user
module.exports = Course;
