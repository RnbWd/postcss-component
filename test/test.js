var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.styles).to.eql({
          App: { width: '100%', height: '200%' },
          Potato: { background: 'blue', position: 'relative' }
        });
        done();
    });
};

describe('postcss-component', function () {

    it('does something', function (done) {
        test('@component App {.main {width: 100%;height: 200%;}}.main{width: 100%}@component Potato {.main {background: blue;position: relative;}}', '.main{width: 100%}', {}, done);
    });

});
