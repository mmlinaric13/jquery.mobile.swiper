jquery.swiper.js - v1.0
================================

# Introduction

This is Widget is meant to mimic the iOS swipe delete functionality.

It is comprised of 2 files **jquery.swiper.js** and **jquery.swiper.css** (as well as the minified versions)

# Getting started

This widget was developed using the following projects which are required:

1. [jQuery v1.8.2](http://code.jquery.com/jquery-1.8.2.min.js)
2. [jQuery Mobile v1.2.0](http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js)
3. [jQuery Mobile v1.2.0 Stylesheet](http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css)

# Documentation & Usage

While swiper will work by simply calling:

$('#list li').swiper();

You obviously want something to happen with they click the button, this will require you to provide a click function:

$('#list li').swiper({
 click: function(event, ui){
  var $item = $(this);
  $item.fadeOut("fast", function(){
   $item.remove();
  });
 }
});

See [examples.html](https://github.com/bentonam/jquery.mobile.swiper/blob/master/examples.html) for more detailed usage

# Downloads

To download the latest version of the Widget, please use the project [Downloads](https://github.com/bentonam/jquery.mobile.swiper/downloads) section on GitHub.

# Bugs

To report any bugs, please use the project [Issues](https://github.com/bentonam/jquery.mobile.swiper/issues) section on GitHub.

# Feedback

jquery.swiper.js is licensed under the [MIT License](https://github.com/bentonam/jquery.mobile.swiper/blob/master/LICENSE-MIT).

*Credits: Inspired by [Andy Matthews](http://andymatthews.net) [jquery.swipeButton.js](https://github.com/commadelimited/jquery.swipeButton.js)
