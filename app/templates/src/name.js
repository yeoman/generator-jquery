/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.author_name %>
 * Licensed under the <%= props.license %> license.
 */
(function ($) {
  <% if (props.kind === 'collection_method') { %>$.fn.<%= camelname %> = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('<%= camelname %>' + i);
    });
  };<% } if (props.kind === 'static_method') { %>$.<%= camelname %> = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.<%= camelname %>.options, options);
    // Return the name of your plugin plus a punctuation character.
    return '<%= camelname %>' + options.punctuation;
  };

  // Default options.
  $.<%= camelname %>.options = {
    punctuation: '.'
  };<% } if (props.kind === 'custom_selector') { %>
  $.expr[':'].<%= camelname %> = function (el) {
    return $(el).text() === 'awesome test markup';
  };<% } %>
}(jQuery));
