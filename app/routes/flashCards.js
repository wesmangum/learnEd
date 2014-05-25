/* jshint unused:false*/
'use strict';
var courses = global.nss.db.collection('courses');
var flashCards = global.nss.db.collection('flashCards');
var traceur = require('traceur');
var FlashCard = traceur.require(__dirname + '/../models/flashCard.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var Mongo = require('mongodb');
var _ = require('lodash');


exports.create = (req, res)=>{
	var  idString = req.body.courseId;
	var courseId = Mongo.ObjectID(idString);
  	var fCard = new FlashCard(idString);
  	console.log('LOOK HERE');
  	console.log(idString);
  	Course.findByCourseId(idString, course=>{
  		course.hasFlashCards = true;
  		courses.save(course, ()=>{
  			flashCards.save(fCard, (error, response)=>{
   				 res.redirect(`/courses/${courseId}/flashcards`);
 			 });
  		});
  	});
  
};

exports.show = (req, res)=>{
	var course = req.params.courseId;
	res.render('courses/flashCard', {courseId: course});
};

exports.addNew = (req, res)=>{
	flashCards.findOne({courseId: req.body.courseId}, cardObj=>{
		cardObj = _.create(FlashCard.prototype, cardObj);
		cardObj.addFlashCard(req.body.sideA, req.body.sideB);
		console.log(cardObj);
		flashCards.save(cardObj, (err, response)=>{
			console.log(response);
		});
	});
	//courseId, sideA, sideB
	console.log(req.body);
};

exports.flashCardForm = (req, res)=>{
  res.render('studyTools/addFlashCard');
};

exports.index = (req, res)=>{
  res.render('courses/flashcard');
};
