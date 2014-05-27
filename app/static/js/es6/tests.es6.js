/* global ajax*/
/* jshint unused:false*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    loadQuestions();
    $('#submit').click(newQuestion);
    $('#questionList').on('click', '#submitIt', submitTest);
  }

  function submitTest(){
    var ans = $('input:checked').toArray().map(each => each.value.toString());
    var courseId = $('.course').val();
    console.log(courseId);
    console.log(ans);
    ajax(`/courses/submitTest/${courseId}`, 'put', {answers: ans}, html=>{
      console.log(html);
    });
    
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

  function loadQuestions(){
    var course = $('.course').val();
    ajax(`/tests/getQuestions`, 'get', {courseId: course}, html=>{
      $('#questionList').append(html);
    });
  }

})();
