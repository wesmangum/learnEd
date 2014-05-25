'use strict';
//var users = global.nss.db.collection('users');
var flashCards = global.nss.db.collection('flashCards');
//var bcrypt = require('bcrypt');
// var Mongo = require('mongodb');
var _ = require('lodash');


class FlashCard{
  constructor(course){
    this.courseId = course;
    this.cards = [];
  }


  static findByCourseId(id, func){
    // id = Mongo.ObjectID(id);
    flashCards.findOne({courseId: id}, (error, result)=>{
      result = _.create(FlashCard.prototype, result);
      func(result);
    });
  }// end findByUserId

}//end user
module.exports = FlashCard;
