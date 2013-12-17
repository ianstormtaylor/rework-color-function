
var balanced = require('balanced-match');
var color = require('css-color-function');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Plugin to convert hex colors with alpha values into their RGBA equivalents
 * for more browser support.
 *
 * @param {Object} stylesheet
 */

function plugin (stylesheet) {
  stylesheet.rules.forEach(function (rule) {
    if (!rule.declarations) return;
    rule.declarations.forEach(function (dec, i) {
      if (!dec.value) return;
      dec.value = convert(dec.value);
    });
  });
}

/**
 * Convert any color functions in a CSS property value `string` into their RGBA
 * equivalent.
 *
 * @param {String} string
 * @return {String}
 */

function convert (string) {
  var index = string.indexOf('color(');
  if (index == -1) return string;

  var fn = string.slice(index);
  var ret = balanced('(', ')', fn);
  fn = 'color(' + ret.body + ')';

  return string.slice(0, index) + color.convert(fn) + convert(ret.post);
}