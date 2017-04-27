'use strict';

var _inlineTags = new Set(['b', 'big', 'i', 'small', 'tt', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'em', 'kbd', 'strong', 'samp', 'var', 'a', 'bdo', 'br', 'img', 'map', 'object', 'q', 'script', 'span', 'sub', 'sup', 'button', 'input', 'label', 'select', 'textarea']);

module.exports = function (node) {
  var isStartOfLine = true;
  var text = '';

  var appendText = function appendText(childNodes) {
    for (var index = 0; index < childNodes.length; index++) {
      var _node = childNodes[index];

      if (_node.nodeType === 3) {
        // text node
        text += _node.textContent;
        isStartOfLine = false;
        continue;
      }

      if (_node.tagName === 'BR') {
        text += '\n';
        isStartOfLine = true;
        continue;
      }

      if (_inlineTags.has(_node.tagName.toLowerCase())) {
        appendText(_node.childNodes);
        continue;
      }

      if (!isStartOfLine) {
        text += '\n';
        isStartOfLine = true;
      }

      appendText(_node.childNodes);

      if (!isStartOfLine) {
        text += '\n';
        isStartOfLine = true;
      }
    }
  };

  appendText(node.childNodes);

  if (text.length && text.charAt(text.length - 1) === '\n') text = text.substring(0, text.length - 1);

  return text;
};