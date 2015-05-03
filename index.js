var postcss = require('postcss');

module.exports = postcss.plugin('postcss-component', function (opts) {
  opts = opts || {};

    // Work with options here

  return function (css) {
    css.eachAtRule('component', function (component) {
      component.eachRule(function(rule) {
        var selector = rule.selector;
        if (selector.startsWith('.')) {
          selector = selector.slice(1);
        }
        rule.selector = selector+':';
        // rule.replaceValues(/\d+%/, {}, function(string) {
        //   return '"'+string+'"'
        // });
        // console.log(rule.toString().replace(/\;/g, ','));
        var styles = {};
        rule.nodes.forEach(function(val) {
          if (val.type === 'decl') {
            styles[val.prop] = val.value;
          }
        })
        console.log(styles);
      })

      // console.log(component.nodes)
      component.removeSelf();
    });
  };
});
