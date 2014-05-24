(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#addFlashCard').click(addFlashCard);
  }
  function addFlashCard() {
    ajax("/studyTools/addFlashCard", 'get', null, (function(html) {
      $('#flashForm').append(html);
    }));
  }
})();

//# sourceMappingURL=courses.map
