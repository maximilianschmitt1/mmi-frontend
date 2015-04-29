'use strict';

var mobile = require('is-mobile')(navigator.userAgent);
var angular = require('angular');
var $ = require('jquery');

var tooltip = /* @ngInject */ function($compile) {
  return {
    link: function(scope, $el, attrs) {
      // disable tooltips on mobile
      if (mobile) {
        return;
      }

      var content = angular.element('<span>' + attrs.tooltip + '</span>');

      $el.tooltipster({
        content: content,
        delay: attrs.tooltipDelay || 0,
        speed: attrs.tooltipSpeed || 100,
        position: attrs.tooltipPosition || 'top',
        theme: 'habit-tooltipster',
        functionReady: function() {
          if (attrs.tooltipPosition) {
            return;
          }

          var offset = elementOffset($el.tooltipster('elementTooltip'));
          if (offset.left < 20) {
            $el.tooltipster('option', 'position', 'top-left');
            $el.tooltipster('reposition');
          } else if (offset.right > $(window).width() - 20) {
            $el.tooltipster('option', 'position', 'top-right');
            $el.tooltipster('reposition');
          } else {
            return;
          }
          
          // hack to fix a weird bug where top-right isnt positioned properly
          window.requestAnimationFrame(function() { $el.tooltipster('reposition'); });
        }
      });

      $compile(content)(scope).scope().$watch(function() {
        $el.tooltipster('reposition');
      });
    }
  };
};

function elementOffset(element) {
  var de = document.documentElement;
  var box = element.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - de.clientTop,
    left: box.left + window.pageXOffset - de.clientLeft,
    right: box.right
  };
}

module.exports = tooltip;