/* jshint unused:false*/
'use strict';
var courses = global.nss.db.collection('courses');
var users = global.nss.db.collection('users');
var flashCards = global.nss.db.collection('flashCards');
var traceur = require('traceur');
var FlashCard = traceur.require(__dirname + '/../models/flashCard.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var Mongo = require('mongodb');
//var _ = require('lodash');


exports.create = (req, res)=>{
	var  idString = req.body.courseId;
	var courseId = Mongo.ObjectID(idString);
  	var fCard = new FlashCard(idString);
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
	var id = Mongo.ObjectID(req.session.userId);
	users.findOne({_id: id}, (err, user)=>{
		if (user.type === 'teacher') {
			res.render('courses/flashCard', {courseId: course});
		}else{
			res.render('courses/student/flashCards', {courseId: course});
		}
	});

};

exports.loadCards = (req, res)=>{
	FlashCard.findByCourseId(req.query.courseId, response=>{
		var id = Mongo.ObjectID(req.session.userId);
		users.findOne({_id: id}, (err, user)=>{
			if (user.type === 'teacher') {
				res.render('courses/cardTable', {card: response}, (err, response)=>{
					res.send(response);
				});
			}else{
				res.render('courses/student/cardTable', {card: response}, (err, html)=>{
					res.send(html);
				});
			}
		});
	});
};

exports.addNew = (req, res)=>{
	flashCards.findOne({courseId: req.body.courseId}, (err, cardObj)=>{
		cardObj.cards.push({sideA: req.body.sideA, sideB: req.body.sideB});
		flashCards.save(cardObj, (err, response)=>{
			res.render('courses/cardTable', {card: cardObj}, (err, response)=>{
				res.send(response);
			});
		});
	});
};

exports.flashCardForm = (req, res)=>{
  res.render('studyTools/addFlashCard');
};

exports.index = (req, res)=>{
  res.render('courses/flashcard');
};
