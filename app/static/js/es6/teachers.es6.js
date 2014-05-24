/* global ajax*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    $('#addCourse').click(addCourse);
  }

  function addCourse(){
    ajax(`/courses/create`, 'get', null, html=>{
      $('#courseForm').append(html);
    });
  }

})();
