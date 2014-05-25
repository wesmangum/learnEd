(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#addCourse').click(addCourse);
  }
  function addCourse() {
    ajax("/courses/create", 'get', null, (function(html) {
      $('#courseForm').append(html);
    }));
  }
})();

//# sourceMappingURL=course.map
