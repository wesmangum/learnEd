(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    loadCourses();
  }
  function loadCourses() {
    ajax('/users/students/courses', 'get', null, (function(response) {
      $('#courses').empty().append(response);
    }));
  }
})();

//# sourceMappingURL=students.map
