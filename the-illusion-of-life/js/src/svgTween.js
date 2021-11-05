/*
svgTween.js v1.0.0
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Copyright 2015, Smashing Magazine
http://www.smashingmagazine.com/
http://www.hellomichael.com/
*/

; (function(window) {
  'use strict';

  var svgTween = function (options) {
    var self = this;
    self.options = extend({}, self.options);
    extend(self.options, options);
    self.init();
  }

  svgTween.prototype = {
    constructor: svgTween,

    options: {
      element: null,
      keyframes: null,
      duration: null,
    },

    init: function () {
      var self = this;

      self.resetTween(self.options.element, self.options.keyframes);
      self.playTween(self.options.element, self.options.keyframes, self.options.duration, 0);
    }, 
    
    /*
      Recursively loop through keyframes to create pauses or tweens

      @param {Object} element
      @param {Array} keyframes
      @param {Int} duration
      @param {Int} index
    */
    playTween: function (element, keyframes, duration, index) {
      var self = this;

      // Set keyframes we're transitioning to
      var translateX = keyframe[index].x;
      var translateY = keyframe[index].y;

      // Set easing parameter
      var easing = mina[keyframe[index].easing];

      // Set duration as an initial pause or the difference of the steps between keyframes
      var newDuration = index ? 
        ((keyframes[index].step - keyframes[(index-1)].step) * duration)
        : (keyframes[index].step * duration);

      // Play first tween immediately if starts on step 0
      if (index === 0 && keyframes[index].step === 0) {
        self.playTween(element, keyframes, duration, (index + 1));
      }
      // Or pause tween if initial keyframe
      else if (index === 0 && keyframes[index].step !==0) {
        setTimeout(function() {
          if (index !== (keyframes.length - 1)) {
            self.playTween(element, keyframes, duration, (index + 1));
          }
        }, newDuration);
      }
      // Or animate tweens if keyframes exist
      else {
        element.animate(
          {
            transform: 'T' + translateX + ' ' + translateY
          },
          newDuration,
          easing,
          function () {
            if (index !== (keyframes.length - 1)) {
              self.playTween(element, keyframes, duration, (index + 1));
            }
          }
        );
      }
    },

    /*
      Reset the animation to the first keyframe
      @param {Object} element
      @param {Array} keyframes
    */
    resetTween: function (element, keyframe) {
      var self = this;
      
      var translateX = keyframes[0].x;
      var translateY = keyframes[0].y;

      element.transform('T' + translateX + ',' + translateY);
    }
  };

  /*
    Merges tow objects
    @param {Object} a
    @param {Object} b
    @return {Object} sum
    http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
  */
  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  }

  // Add to namespace
  window.svgTween = svgTween
})(window);