/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.author_name %>
 * Licensed under the <%= props.license %> license.
 */

(function ($) {

  // Collection method.
  $.fn.<%= props.name %> = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('<%= props.name %>' + i);
    });
  };

  // Static method.
  $.<%= props.name %> = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.<%= props.name %>.options, options);
    // Return the name of your plugin plus a punctuation character.
    return '<%= props.name %>' + options.punctuation;
  };

  // Static method default options.
  $.<%= props.name %>.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].<%= props.name %> = function (elem) {
    // Does this element contain the name of your plugin?
    return $(elem).text().indexOf('<%= props.name %>') !== -1;
  };

}(jQuery));
