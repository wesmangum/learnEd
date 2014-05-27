/* jshint unused:false*/
'use strict';
var courses = global.nss.db.collection('courses');
var users = global.nss.db.collection('users');
var tests = global.nss.db.collection('tests');
var flashCards = global.nss.db.collection('flashCards');
var traceur = require('traceur');
var FlashCard = traceur.require(__dirname + '/../models/flashCard.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var Test = traceur.require(__dirname + '/../models/test.js');
var Mongo = require('mongodb');
var _ = require('lodash');

exports.submitTest = (req, res)=>{
	var answerArr = req.body.answers;
	Test.findByCourseId(req.params.id, test=>{
		test.gradeTest(answerArr, test, score=>{
			User.findByUserId(req.session.userId, user=>{
				var courses= user.courses;
				var currentCourse = _.filter(courses, {courseId:req.params.id});
				if((currentCourse[0].score*1)<=score){
					currentCourse[0].score= score;
					users.save(user, ()=>{
						res.render('courses/student/score', {score:score});
					});
				}else{
					res.render('courses/student/score', {score:score});
				}
				
			});
		});
	});
};

exports.create = (req, res)=>{
	var  idString = req.body.courseId;
	var courseId = Mongo.ObjectID(idString);
  	var test = new Test(idString);
  	Course.findByCourseId(idString, course=>{
  		course.hasTest = true;
  		courses.save(course, ()=>{
  			tests.save(test, (error, response)=>{
   				 res.redirect(`/courses/${courseId}/tests`);
 			 });
  		});
  	});
};

exports.show = (req, res)=>{
	var course = req.params.courseId;
	var id = Mongo.ObjectID(req.session.userId);
	users.findOne({_id: id}, (err, user)=>{
		if(user.type === 'teacher'){
			res.render('courses/test', {courseId: course});
		}
		else{
			res.render('courses/student/test', {courseId: course});
		}
	});
};

exports.addQuestion = (req, res)=>{
	tests.findOne({courseId: req.body.courseId}, (err, testObj)=>{
		testObj.questions.push(req.body.questionObj);
		tests.save(testObj,  (error, response)=>{
			res.render('courses/testTable', {test:testObj}, (err, html)=>{
				res.send(html);
			});
		});
	});
};

exports.loadQuestions = (req, res)=>{
	Test.findByCourseId(req.query.courseId, response=>{
		var id = Mongo.ObjectID(req.session.userId);
		users.findOne({_id: id}, (err, user)=>{
			if(user.type === 'teacher'){
				res.render('courses/testTable', {test: response}, (err, response)=>{
					res.send(response);
				});
			}
			else{
				res.render('courses/student/testTable', {test: response}, (err, html)=>{
					res.send(html);
				});
			}
		});
	
	});	
};
