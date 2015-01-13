/*global describe, it */
'use strict';
var assert  = require('assert');

describe('jquery generator', function () {
  it('can be imported without blowing up', function () {
    assert(require('../app') !== undefined);
  });
});
