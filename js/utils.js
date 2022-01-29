// util for emptying DOM node
function emptyNode(node) {
  while(node.firstChild) {
      node.removeChild(node.firstChild);
  }
}

// util for copying content (like in a textarea) to clipboard
function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function unicodeToChar(text) {
return text.replace(/\\u[\dA-F]{4}/gi,
  function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}