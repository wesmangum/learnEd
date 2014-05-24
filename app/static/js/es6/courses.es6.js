/* global ajax*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    $('#addFlashCard').click(addFlashCard);
  }


  function addFlashCard(){
    ajax(`/studyTools/addFlashCard`, 'get', null, html=>{
      $('#flashForm').append(html);
    });
  }

})();
