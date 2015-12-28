(function () {
  'use strict';

  $.stellar.positionProperty.position = {
    setTop: function($element, newTop, originalTop) {
      $element.css('top', newTop);
    },
    setLeft: function($element, newLeft, originalLeft) {
      $element.css('left', newLeft);
    }
  }

  // init parallax on window
  $.stellar({
    positionProperty: 'position'
  });

})();