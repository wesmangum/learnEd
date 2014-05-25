(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#submit').click(createFlashCard);
  }
  function createFlashCard(event) {
    var sideA = $('.sideA').val();
    var sideB = $('.sideB').val();
    var course = $('.course').val();
    console.log(course);
    ajax('/flashcards/create/newCard', 'post', {
      courseId: course,
      sideA: sideA,
      sideB: sideB
    }, (function(html) {
      console.log(html);
    }));
    event.preventDefault();
  }
})();

//# sourceMappingURL=flashCards.map
