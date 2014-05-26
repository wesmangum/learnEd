/* global ajax*/
/* jshint unused:false*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    loadQuestions();
    $('#submit').click(newQuestion);
  }

  function newQuestion(){
    var question = $('#question').val();
    var answer1 = $('#ans1').val();
    var answer2 = $('#ans2').val();
    var answer3 = $('#ans3').val();
    var answer4 = $('#ans4').val();
    var correct = $('input:checked').val();
    var courseId = $('.course').val();
    var answerArr = [{answer: answer1, isCorrect: false}, {answer: answer2, isCorrect: false}, {answer: answer3, isCorrect: false}, {answer: answer4, isCorrect: false}];
    answerArr[correct-1].isCorrect = true;
    var questionObj = {question: question, answers: answerArr};
    console.log(questionObj);
    ajax('/tests/create/newQuestion', 'post', {questionObj: questionObj, courseId: courseId}, html=>{
      $('#questionList').empty();
      $('#questionList').append(html);
    });
  }

  // function createFlashCard(event){
  //   var sideA = $('.sideA').val();
  //   var sideB = $('.sideB').val();
  //   var course = $('.course').val();
  //   $('.sideA').val('');
  //   $('.sideB').val('');

  //   ajax('/flashcards/create/newCard', 'post', {courseId: course, sideA: sideA, sideB: sideB}, html=>{
  //     $('#cards').empty();
  //     $('#cards').append(html);
  //   });
  //   event.preventDefault();
  // }

  function loadQuestions(){
    var course = $('.course').val();
    ajax(`/tests/getQuestions`, 'get', {courseId: course}, html=>{
      $('#questionList').append(html);
    });
  }

})();
