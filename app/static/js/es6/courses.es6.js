/* global ajax*/
(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    $('#addFlashCard').click(addFlashCardForm);
    $('#flashForm').on('click', '.submitFC', addNewCard);
  }


  function addFlashCardForm(){
    ajax(`/studyTools/addFlashCard`, 'get', null, html=>{
      $('#flashForm').append(html);
    });
  }

  function addNewCard(){
    // var sideA = $('.sideA').val();
    // var sideB = $('.sideB').val();
    // $('#flashForm').empty();
    //
  }

})();
