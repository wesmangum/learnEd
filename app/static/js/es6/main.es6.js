/* exported ajax */

function ajax(url, type,  data={}, success=response=>console.log(response), dataType='html'){
  'use strict';
  $.ajax({url: url, type: type, data: data, dataType: dataType, success:success});
}

(function(){
  'use strict';

  $(document).ready(init);


  function init(){
    $('.dropdown-menu').find('form').click(dropdown);

  }


  //Handles menu   drop down
  function dropdown(e){
    e.stopPropagation();
  }

})();
