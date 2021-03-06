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
  var tests = traceur.require(__dirname + '/../routes/tests.js');
  var flashCards = traceur.require(__dirname + '/../routes/flashCards.js');

  app.get('/', dbg, home.index);

  app.post('/login', dbg, users.login);
  app.get('/register', dbg, users.loadRegister);
  app.post('/register', dbg, users.register);
  app.get('/logout', dbg, users.logout);

  app.get('/courses/index', dbg, courses.index);
  app.put('/courses/:courseId/bookmark', dbg, courses.bookmark);

  app.get('/users/dashboard', dbg, users.dashboard);
  app.put('/users/dashboard', dbg, users.dashboard);
  app.get('/users/teachers/links', dbg, users.getLinks);
  app.get('/users/students/courses', dbg, users.getCourses);
  app.post('/courses/create', dbg, courses.create);
  app.get('/courses/show/:id', dbg, courses.show);
  app.get('/courses/:courseId/tests', dbg, tests.show);
  app.put('/courses/submitTest/:id', dbg, tests.submitTest);
  

  app.post('/tests/create', dbg, tests.create);
  app.post('/tests/create/newQuestion', dbg, tests.addQuestion);
  app.get('/tests/getQuestions', dbg, tests.loadQuestions);

  app.post('/flashcards/create', dbg, flashCards.create);
  app.get('/courses/:courseId/flashcards', dbg, flashCards.show);
  app.post('/flashcards/create/newCard', dbg, flashCards.addNew);
  app.get('/flashcards/getCards', dbg, flashCards.loadCards);



  console.log('Routes Loaded');
  fn();
}
