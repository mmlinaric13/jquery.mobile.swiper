/*
 Author: Aaron Benton (@bentonam),
 Date: 10/10/2012
 Purpose: widget that allows for iOS style swiping with a Delete button
*/
;(function($, undefined){
 $.widget("amb.swiper", {
  options: {
   direction: "right", // can be left, right or both
   label: "Delete",
   theme: "b",
   mini: true,
   icon: "none",
   iconpos: "left", // only accounted for left or right in the css
   corners: true,
   shadow: true
  },
  _create: function(){
   var self = this; // global reference to widget object
   self.element.addClass("ui-swiper-container"); // adds the class so we can set the position to relative
  },
  _init: function(){
   var self = this;
   self._options(); // set the options
   self._button(); // create the button
   self._events();
  },
  _events: function(){
   var self = this;
   self.element
    .off(".swiper") // remove the swipe event incase someone is re-initing swiper
    .off(".swiper", "a.ui-swiper-btn")
    .on("swipe" + self.options.direction + ".swiper", function(event){ // create the swipe event
     self.btn.detach();
     self.element
      .addClass("ui-swiper-swiped") // add a swiped class to the element incase someone wants to style it
      .append(self.btn.hide());
     self.btn.animate({
      width: "toggle"
     }, 200);
     self._trigger("swipe"); // trigger a swipe event incase the user wants to do more (event is "swiperswipe")
    })
    .on("click.swiper", "a.ui-swiper-btn", function(event){ // delegate the button click event since it can be recreated when options are changed after the fact
     event.stopPropagation();
     event.preventDefault();
     self.btn.remove(); // just remove the button
     self._trigger("click"); // and let trigger a click event that the user would have passed in, with the context of the element that was swiped and let them decide what to do (event is "swiperclick")
    });
  },
  _options: function(){
   var self = this;
   self.options = $.extend(self.options, { // look for swiper data attributes if they are present use them instead of the options passed in or the defaults
    direction: self.element.data("swiper-direction") || self.options.direction,
    label: self.element.data("swiper-label") || self.options.label,
    theme: self.element.data("swiper-theme") || self.options.theme,
    mini: typeof self.element.data("swiper-mini") === "boolean" ? self.element.data("swiper-mini") : self.options.mini,
    icon: self.element.data("swiper-icon") || self.options.icon,
    iconpos: self.element.data("swiper-iconpos") || self.options.iconpos,
    corners: typeof self.element.data("swiper-corners") === "boolean" ? self.element.data("swiper-corners") : self.options.corners,
    shadow: typeof self.element.data("swiper-corners") === "boolean" ? self.element.data("swiper-corners") : self.options.corners
   });
  },
  _button: function(){ // build the button
   var self = this,
       isVisible = false;
   if(self.btn){ // if the button exists
    isVisible = !!self.btn.parent().length; // check to see if it is already in the DOM
    self.btn.remove(); // remove it
   }
   self.btn = $("<a />")
               .text(self.options.label)
               .attr({
                href: "#"
               })
               .addClass("ui-swiper-btn")
               .data($.extend({
                role: "button",
                corners: self.options.corners,
                mini: self.options.mini,
                theme: self.options.theme,
                inline: true
               }, (function(){ // had to do this because setting iconpos adds the icon classes even if icon is none
                return self.options.icon === "none" ? {} : {
                 icon: self.options.icon,
                 iconpos: self.options.iconpos
                };
               })())
               )
               .button();
   isVisible && self.element.append(self.btn); // if it was already in the DOM add the new button back
  },
  _setOption: function(key, value) {
   var self = this,
       oldValue = self.options[key];
   $.Widget.prototype._setOption.apply(self, arguments); // call the base _setOption method
   self._button(); // always rebuild the button whenever an option is set
   self._trigger("setOption", { // trigger a callback when options change incase the user wants that
    type: "setOption"
   }, {
    option: key,
    original: oldValue,
    current: value
   });
  },
  destroy: function(){ // undo everything
   var self = this;
   self.element
    .removeClass("ui-swiper-container") // remove our container class
    .off(".swiper")
    .off(".swiper", "a.ui-swiper-btn"); // unbind our events
   self.btn.remove(); // remove the button
   $.Widget.prototype.destroy.call(self);
  }
 });
})(jQuery);