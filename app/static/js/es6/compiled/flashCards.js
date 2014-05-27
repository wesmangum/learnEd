(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    loadFlashCards();
    $('#submit').click(createFlashCard);
    $('#magicCards').on('click', '.sideA, .sideB', flip);
  }
  function flip() {
    $(this).siblings().removeClass('hidden');
    $(this).addClass('hidden');
  }
  function createFlashCard(event) {
    var sideA = $('.sideA').val();
    var sideB = $('.sideB').val();
    var course = $('.course').val();
    $('.sideA').val('');
    $('.sideB').val('');
    ajax('/flashcards/create/newCard', 'post', {
      courseId: course,
      sideA: sideA,
      sideB: sideB
    }, (function(html) {
      $('#magicCards').empty();
      $('#magicCards').append(html);
    }));
    event.preventDefault();
  }
  function loadFlashCards() {
    var course = $('.course').val();
    ajax("/flashcards/getCards", 'get', {courseId: course}, (function(html) {
      $('#magicCards').append(html);
    }));
  }
})();

//# sourceMappingURL=flashCards.map
