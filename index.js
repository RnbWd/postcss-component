var postcss = require('postcss');
var styles = {};
module.exports = postcss.plugin('postcss-component', function (opts) {
  opts = opts || {};

    // Work with options here

  return function (css, result) {
    css.eachAtRule('component', function (component) {
      component.eachRule(function(rule) {
        var compStyle = styles[component.params] = {};
        rule.nodes.forEach(function(val) {
          if (val.type === 'decl') {
            compStyle[val.prop] = val.value;
          }
        })
      })
      component.removeSelf();
    });
    result.styles = styles;
  };
});
