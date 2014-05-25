'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var courses = traceur.require(__dirname + '/../routes/courses.js');
  var flashCards = traceur.require(__dirname + '/../routes/flashCards.js');

  app.get('/', dbg, home.index);

  app.post('/login', dbg, users.login);
  app.get('/register', dbg, users.loadRegister);
  app.post('/register', dbg, users.register);
  app.get('/logout', dbg, users.logout);

  app.get('/users/dashboard', dbg, users.dashboard);
  app.get('/users/teachers/links', dbg, users.getLinks);
  app.post('/courses/create', dbg, courses.create);
  app.get('/courses/show/:id', dbg, courses.show);

  app.post('/flashcards/create', dbg, flashCards.create);
  app.get('/courses/:courseId/flashcards', dbg, flashCards.show);
  app.post('/flashcards/create/newCard', dbg, flashCards.addNew);
  app.get('/flashcards/getCards', dbg, flashCards.loadCards);



  // //everything down here gets moved up if used or deleted when we're done
  // app.get('/courses/create', dbg, courses.loadCourseForm);
  

  // app.get('/courses/courseSnippet', dbg, courses.courseForm);
  // app.get('/studyTools/create/flashcards/:courseId', dbg, flashCards.create);
  // app.get('/studyTools/addFlashCard', dbg, flashCards.flashCardForm);
  // //app.post('/flashcards/create', dbg, flashCards.create);

  // app.get('/flashcard', dbg, flashCards.index);

  console.log('Routes Loaded');
  fn();
}
