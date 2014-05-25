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
    this.hasFlashCards = false;
    this.hasTest = false;
  }


  static findByCourseId(id, func){
    id = Mongo.ObjectID(id);
    courses.findOne({_id: id}, (error, result)=>{
      console.log('error and result *******************');
      console.log(error);
      console.log(result);
      func(result);
    });
  }// end gindByUserId

  static findAllByTeacherId(id, func){
    // id = Mongo.ObjectID(id);
    courses.find({teacherId: id}).toArray((error, courses)=>{
      func(courses);
    });
  }// end gindByUserId

  // get hasFlashCards(){
  //   return this.hasFlashCards;
  // }
  //
  // get hasTest(){
  //   return this.hasTest;
  // }




}//end user
module.exports = Course;
