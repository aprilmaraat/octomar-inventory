(function() {

  'use strict';

  angular
    .module('inventory')
    .filter('padright', Filter);

  Filter.$inject = [];

  function Filter() {

    return function(str, pad, length) {

  		if(!pad) {
  			pad = '0000';
  		}

      if(length) {
        var tempPad = '';
        for(var i = 0; i < length; i++) {
          tempPad += pad;
        }
        pad = tempPad;
      }

	  	return (str + pad).substring(0, pad.length);
    };

  }

})();
