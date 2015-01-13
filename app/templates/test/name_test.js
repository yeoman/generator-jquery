(function ($) {
  module('jQuery#<%= camelname %>', {
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

  module('jQuery.<%= camelname %>');

  test('is <%= camelname %>', function () {
    expect(2);
    strictEqual($.<%= camelname %>(), '<%= camelname %>.', 'should be <%= camelname %>');
    strictEqual($.<%= camelname %>({punctuation: '!'}), '<%= camelname %>!', 'should be thoroughly <%= camelname %>');
  });

  module(':<%= camelname %> selector', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is <%= camelname %>', function () {
    expect(1);
    deepEqual(this.elems.filter(':<%= camelname %>').get(), this.elems.last().get());
  });
}(jQuery));
