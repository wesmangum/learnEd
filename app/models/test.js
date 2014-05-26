'use strict';
//var users = global.nss.db.collection('users');
var tests = global.nss.db.collection('tests');
//var bcrypt = require('bcrypt');
// var Mongo = require('mongodb');
var _ = require('lodash');


class Test{
  constructor(course){
    this.courseId = course;
    this.questions = [];
  }


  static findByCourseId(id, func){
    // id = Mongo.ObjectID(id);
    tests.findOne({courseId: id}, (error, result)=>{
      result = _.create(Test.prototype, result);
      func(result);
    });
  }// end findByUserId

}//end user
module.exports = Test;
