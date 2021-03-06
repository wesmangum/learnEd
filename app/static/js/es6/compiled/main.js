function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(response) {
    return console.log(response);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    data: data,
    dataType: dataType,
    success: success
  });
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('.dropdown-menu').find('form').click(dropdown);
    $('.glyphicon').click(activeTab);
  }
  function dropdown(e) {
    e.stopPropagation();
  }
  function activeTab() {
    $('.active').removeClass('active');
    $(this).parent().addClass('active');
  }
})();

//# sourceMappingURL=main.map
