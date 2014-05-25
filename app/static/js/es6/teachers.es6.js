/* global ajax*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    getCourseLinks();
  }

  function getCourseLinks(){
    $('#existingCourses').empty();

    ajax('/users/teachers/links', 'get', null, html=>{
    	$('#existingCourses').append(html);
    });
  }

})();
// function ajax(url, type,  data={}, success=response=>console.log(response), dataType='html'){
//   'use strict';
//   $.ajax({url: url, type: type, data: data, dataType: dataType, success:success});
// }
