var postcss = require('postcss');
var styles = {};
module.exports = postcss.plugin('postcss-component', function (opts) {
  opts = opts || {};

    // Work with options here

  return function (css, result) {
    css.eachAtRule('component', function (component) {
      var compStyle = styles[component.params] = {};
      component.eachRule(function(rule) {
        var selector = rule.selector;
        if (rule.selector.startsWith('.') || rule.selector.startsWith('#')) {
          selector = rule.selector.slice(1);
        }
        var compRule = compStyle[selector] = {};
        rule.nodes.forEach(function(val) {
          if (val.type === 'decl') {
            compRule[val.prop] = val.value;
          }
        })
      })
      component.removeSelf();
    });
    result.styles = styles;
  };
});
