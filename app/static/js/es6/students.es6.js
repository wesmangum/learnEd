/*global ajax*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
  	loadCourses();
  }
    



  function loadCourses(){
  	ajax('/users/students/courses', 'get', null, response=>{
  		$('#courses').empty().append(response);
  	});
  }



})();
