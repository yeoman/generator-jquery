(function ($) {
  <% if (props.kind === 'collection_method') { %>module('jQuery#<%= camelname %>', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.<%= camelname %>(), this.elems, 'should be chainable');
  });

  test('is <%= camelname %>', function () {
    expect(1);
    strictEqual(this.elems.<%= camelname %>().text(), '<%= camelname %>0<%= camelname %>1<%= camelname %>2', 'should be <%= camelname %>');
  });
<% } if (props.kind === 'static_method') { %>module('jQuery.<%= camelname %>');

  test('is <%= camelname %>', function () {
    expect(2);
    strictEqual($.<%= camelname %>(), '<%= camelname %>.', 'should be <%= camelname %>');
    strictEqual($.<%= camelname %>({punctuation: '!'}), '<%= camelname %>!', 'should be thoroughly <%= camelname %>');
  });
  <% } if (props.kind === 'custom_selector') { %>module(':<%= camelname %> selector', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is <%= camelname %>', function () {
    expect(1);
    deepEqual(this.elems.filter(':<%= camelname %>').get(), this.elems.last().get());
  });<% } %>
}(jQuery));
