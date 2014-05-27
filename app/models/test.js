'use strict';
//var users = global.nss.db.collection('users');
var tests = global.nss.db.collection('tests');
//var bcrypt = require('bcrypt');
// var Mongo = require('mongodb');
var _ = require('lodash');
var async = require('async');


class Test{
  constructor(course){
    this.courseId = course;
    this.questions = [];
  }


  static findByCourseId(id, func){
    tests.findOne({courseId: id}, (error, result)=>{
      result = _.create(Test.prototype, result);
      func(result);
    });
  }// end findByUserId

  gradeTest(array, test, func){
    var testArr = test.questions;
    var correct = 0;
    async.each(testArr, (question, callback)=>{
      var arrObj = question.answers;
      var correctAns = _.filter(arrObj, {'isCorrect':'true'}).map(ques=> ques.answer);
      var test = _.intersection(array, correctAns);
      if(test.length>0){
        correct += 1;
      }
      callback();
    }, ()=>{
      var score = ((correct/testArr.length)*100).toFixed(0);
      func(score);
    });
  }
}//end user
module.exports = Test;
