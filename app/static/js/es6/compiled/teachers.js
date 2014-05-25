(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    getCourseLinks();
  }
  function getCourseLinks() {
    $('#existingCourses').empty();
    ajax('/users/teachers/links', 'get', null, (function(html) {
      $('#existingCourses').append(html);
    }));
  }
})();

//# sourceMappingURL=teachers.map
