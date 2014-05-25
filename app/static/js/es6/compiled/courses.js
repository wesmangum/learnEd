(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#addFlashCard').click(addFlashCardForm);
    $('#flashForm').on('click', '.submitFC', addNewCard);
    $('.createFlash').click(createFlashCard);
  }
  function addFlashCardForm() {
    ajax("/studyTools/addFlashCard", 'get', null, (function(html) {
      $('#flashForm').append(html);
    }));
  }
  function createFlashCard() {
    var course = $('h1').attr('data-id');
    ajax('/studyTools/create/flashcards', 'get', {courseId: course}, (function(html) {
      console.log(html);
    }));
  }
  function addNewCard() {}
})();

//# sourceMappingURL=courses.map
