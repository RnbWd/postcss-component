var postcss = require('postcss');

module.exports = postcss.plugin('postcss-component', function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {
      css.eachAtRule('component', function (component) {
        component.eachRule(function(rule) {
          var clone = rule.clone();
          var selector = clone.selector;
          if (selector.startsWith('.')) {
            console.log(selector)
            selector = selector.slice(1);
          }
          clone.selector = '"'+selector+'":';
          // console.log(clone.toString());
        })
        // console.log(component.nodes)
        component.removeSelf();
      });
    };
});
