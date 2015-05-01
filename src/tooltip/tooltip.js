'use strict';

var angular = require('angular');
var $ = require('jquery');
var bowser = require('bowser').browser;
var mobile = bowser.mobile || bowser.tablet;

var tooltip = /* @ngInject */ function($compile) {
  return {
    link: function(scope, $el, attrs) {
      // disable tooltips on mobile
      if (mobile && typeof attrs.tooltipTouch === 'undefined') {
        return;
      }

      var content = angular.element('<span>' + attrs.tooltip + '</span>');
      var padding = mobile ? 30 : 15;

      $el.tooltipster({
        content: content,
        delay: attrs.tooltipDelay || 0,
        speed: attrs.tooltipSpeed || 100,
        position: attrs.tooltipPosition || 'top',
        maxWidth: $(window).width() - 2 * padding,
        theme: 'habit-tooltipster',
        functionReady: function() {
          if (attrs.tooltipPosition) {
            return;
          }

          var offset = elementOffset($el.tooltipster('elementTooltip'));
          if (offset.left < padding) {
            $el.tooltipster('option', 'position', 'top-left');
            $el.tooltipster('reposition');
          } else if (offset.right > $(window).width() - padding) {
            $el.tooltipster('option', 'position', 'top-right');
            $el.tooltipster('reposition');
          } else {
            return;
          }
          
          // hack to fix a weird bug where top-right isnt positioned properly
          $el.tooltipster('reposition');
        }
      });

      $compile(content)(scope).scope().$watch(function() {
        $el.tooltipster('reposition');
      });

      if (mobile) {
        $el.tooltipster('disable');
        $el.on('touchstart touchmove', function() {
          $el.tooltipster('enable');
          $el.tooltipster('show');
        });
        $el.on('touchend touchleave touchcancel', function() {
          $el.tooltipster('hide');
          $el.tooltipster('disable');
        });
      }
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