'use strict';
var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');
var _ = require('lodash');


class User{
  constructor(object){
    this.email = object.email;
    this.password = object.password;
    this.type = object.type;
    this.courses = [];
  }


  register(func){
    users.findOne({email: this.email}, (error, user)=>{
      if(!user){
        this.password = bcrypt.hashSync(this.password, 8);
        users.save(this, (error, user)=>{
            func(user);
          });
        }
      });
    }// end register

  login(password, func){
    var isMatch = bcrypt.compareSync(password, this.password);//bcrypt.compareSync
    func(isMatch);

  }// end login

  static findByUserId(id, func){
    id = Mongo.ObjectID(id);
    users.findOne({_id: id}, (error, result)=>{

      func(result);
    });
  }// end gindByUserId

  static findByUserEmail(email, func){
    users.findOne({email: email}, (error, result)=>{
      result = _.create(User.prototype, result);
      func(result);
    });
  }// end gindByUserId



}//end user
module.exports = User;
