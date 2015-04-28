'use strict';

var animateTransition = require('animate-transition');

var modal = function() {
  return {
    transclude: true,
    templateUrl: '/modals/modal.html',
    link: function(scope, el, attrs) {
      var backdrop = el[0].children[0];

      animateTransition({
        container: backdrop,
        blockIn: backdrop.children[0],
        animation: 'bounce-in'
      });

      scope.closeModal = function() {
        animateTransition({
          container: backdrop,
          blockOut: backdrop.children[0],
          animation: 'fade-out',
          onTransitionEnd: el.scope().close
        });
      };
    }
  };
};

module.exports = modal;