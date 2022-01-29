/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:2, maxerr:50 */
(function (document) {
  "use strict";
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (match) {
      var result = [],
        elements = document.body.getElementsByTagName('*'),
        i, elem;
      match = " " + match + " ";
      for (i = 0; i < elements.length; i++) {
        elem = elements[i];
        if ((" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1) {
          result.push(elem);
        }
      }
      return result;
    };
  }
}(document));