/* jshint unused:false*/
'use strict';
//var users = global.nss.db.collection('users');
var flashCards = global.nss.db.collection('flashCards');
var traceur = require('traceur');
var FlashCard = traceur.require(__dirname + '/../models/flashCard.js');
var Mongo = require('mongodb');


exports.create = (req, res)=>{
  var fCard = new FlashCard(req.body.courseId);
  flashCards.save(fCard, (error, response)=>{
    res.render('courses/flashCard', {card: response});
  });
};

exports.flashCardForm = (req, res)=>{
  res.render('studyTools/addFlashCard');
};
