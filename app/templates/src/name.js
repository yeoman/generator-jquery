/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.author_name %>
 * Licensed under the <%= props.license %> license.
 */

(function ($) {

  // Collection method.
  $.fn.<%= camelname %> = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('<%= camelname %>' + i);
    });
  };

  // Static method.
  $.<%= camelname %> = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.<%= camelname %>.options, options);
    // Return the name of your plugin plus a punctuation character.
    return '<%= camelname %>' + options.punctuation;
  };

  // Static method default options.
  $.<%= camelname %>.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].<%= camelname %> = function (elem) {
    // Does this element contain the name of your plugin?
    return $(elem).text().indexOf('<%= camelname %>') !== -1;
  };

}(jQuery));
