(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#addFlashCard').click(addFlashCardForm);
    $('#flashForm').on('click', '.submitFC', addNewCard);
  }
  function addFlashCardForm() {
    ajax("/studyTools/addFlashCard", 'get', null, (function(html) {
      $('#flashForm').append(html);
    }));
  }
  function addNewCard() {}
})();

//# sourceMappingURL=courses.map
