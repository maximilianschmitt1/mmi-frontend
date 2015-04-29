'use strict';

var animateTransition = require('animate-transition');

var modal = function() {
  return {
    transclude: true,
    templateUrl: '/modals/modal.html',
    link: function(scope, el, attrs) {
      var overflow = document.body.style.overflow;
      var height = document.body.style.height;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';

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

      scope.$on('$destroy', function() {
        console.log('resetting to', overflow, height);
        document.body.style.overflow = overflow;
        document.body.style.height = height;
      });
    }
  };
};

module.exports = modal;