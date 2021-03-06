(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    loadQuestions();
    $('#submit').click(newQuestion);
    $('#questionList').on('click', '#submitIt', submitTest);
  }
  function submitTest() {
    var ans = $('input:checked').toArray().map((function(each) {
      return each.value.toString();
    }));
    var courseId = $('.course').val();
    ajax(("/courses/submitTest/" + courseId), 'put', {answers: ans}, (function(response) {
      $('#score').append(response);
    }));
  }
  function newQuestion() {
    var question = $('#question').val();
    var answer1 = $('#ans1').val();
    var answer2 = $('#ans2').val();
    var answer3 = $('#ans3').val();
    var answer4 = $('#ans4').val();
    var correct = $('input:checked').val();
    var courseId = $('.course').val();
    $('#question').val('');
    $('#ans1').val('');
    $('#ans2').val('');
    $('#ans3').val('');
    $('#ans4').val('');
    $('input:checked').checked = false;
    var answerArr = [{
      answer: answer1,
      isCorrect: false
    }, {
      answer: answer2,
      isCorrect: false
    }, {
      answer: answer3,
      isCorrect: false
    }, {
      answer: answer4,
      isCorrect: false
    }];
    answerArr[$traceurRuntime.toProperty(correct - 1)].isCorrect = true;
    var questionObj = {
      question: question,
      answers: answerArr
    };
    ajax('/tests/create/newQuestion', 'post', {
      questionObj: questionObj,
      courseId: courseId
    }, (function(html) {
      $('#questionList').empty();
      $('#questionList').append(html);
    }));
  }
  function loadQuestions() {
    var course = $('.course').val();
    ajax("/tests/getQuestions", 'get', {courseId: course}, (function(html) {
      $('#questionList').append(html);
    }));
  }
})();

//# sourceMappingURL=tests.map
