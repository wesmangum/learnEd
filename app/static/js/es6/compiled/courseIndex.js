(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('.bookmark').click(bookmark);
  }
  function bookmark() {
    var course = $(this).attr('data-id');
    var selected = this;
    ajax(("/courses/" + course + "/bookmark"), 'put', null, (function(response) {
      $(selected).text(response).removeClass('bookmark');
    }));
  }
})();

//# sourceMappingURL=courseIndex.map
